import { describe, expect, it } from "vitest";
import { makeStore } from "@/store";
import { inquiryCleared, orderRequested, productAsked, selectInquiry } from "@/store/slices/inquirySlice";
import {
  cartCleared,
  cartHydrated,
  lineQtyChanged,
  lineRemoved,
  lineUnitChanged,
  lineUpserted,
  MAX_QTY,
  sanitizeLines,
  selectIsHydrated,
  selectLineCount,
  selectLines,
} from "@/store/slices/quoteCartSlice";
import { overlayClosed, quoteCartOpened, searchOpened, selectOverlay } from "@/store/slices/uiSlice";

describe("teklif listesi", () => {
  it("ürün ekler; aynı ürün yeniden eklenince satır çoğalmaz, miktar ve birim güncellenir", () => {
    const store = makeStore();
    store.dispatch(lineUpserted({ productSlug: "ambu-setleri", qty: 2, unit: "Adet" }));
    store.dispatch(lineUpserted({ productSlug: "igneler", qty: 1, unit: "Kutu" }));
    store.dispatch(lineUpserted({ productSlug: "ambu-setleri", qty: 5, unit: "Koli" }));

    expect(selectLineCount(store.getState())).toBe(2);
    expect(selectLines(store.getState())[0]).toEqual({ productSlug: "ambu-setleri", qty: 5, unit: "Koli" });
  });

  it("miktarı 1 ile üst sınır arasında tutar ve tamsayıya yuvarlar", () => {
    const store = makeStore();
    store.dispatch(lineUpserted({ productSlug: "a", qty: 0, unit: "Adet" }));
    expect(selectLines(store.getState())[0].qty).toBe(1);
    store.dispatch(lineQtyChanged({ productSlug: "a", qty: -4 }));
    expect(selectLines(store.getState())[0].qty).toBe(1);
    store.dispatch(lineQtyChanged({ productSlug: "a", qty: 2.6 }));
    expect(selectLines(store.getState())[0].qty).toBe(3);
    store.dispatch(lineQtyChanged({ productSlug: "a", qty: Number.NaN }));
    expect(selectLines(store.getState())[0].qty).toBe(1);
    store.dispatch(lineQtyChanged({ productSlug: "a", qty: 10 ** 9 }));
    expect(selectLines(store.getState())[0].qty).toBe(MAX_QTY);
  });

  it("birim değiştirir, satır çıkarır, listeyi temizler", () => {
    const store = makeStore();
    store.dispatch(lineUpserted({ productSlug: "a", qty: 1, unit: "Adet" }));
    store.dispatch(lineUpserted({ productSlug: "b", qty: 1, unit: "Adet" }));
    store.dispatch(lineUnitChanged({ productSlug: "b", unit: "Kutu" }));
    expect(selectLines(store.getState())[1].unit).toBe("Kutu");
    store.dispatch(lineRemoved("a"));
    expect(selectLines(store.getState()).map((line) => line.productSlug)).toEqual(["b"]);
    store.dispatch(cartCleared());
    expect(selectLineCount(store.getState())).toBe(0);
  });

  it("olmayan satırda güncelleme hiçbir şeyi değiştirmez", () => {
    const store = makeStore();
    store.dispatch(lineQtyChanged({ productSlug: "yok", qty: 3 }));
    store.dispatch(lineRemoved("yok"));
    expect(selectLines(store.getState())).toEqual([]);
  });

  it("kayıtlı liste yüklenene kadar hydrated=false kalır", () => {
    const store = makeStore();
    expect(selectIsHydrated(store.getState())).toBe(false);
    store.dispatch(cartHydrated([{ productSlug: "a", qty: 2, unit: "Koli" }]));
    expect(selectIsHydrated(store.getState())).toBe(true);
    expect(selectLineCount(store.getState())).toBe(1);
  });

  it("bozuk kayıtlı veriyi ayıklar", () => {
    expect(sanitizeLines(null)).toEqual([]);
    expect(sanitizeLines("x")).toEqual([]);
    expect(
      sanitizeLines([
        { productSlug: "a", qty: "3", unit: "Kutu" },
        { productSlug: "a", qty: 9, unit: "Adet" }, // mükerrer
        { productSlug: "", qty: 1, unit: "Adet" }, // slug yok
        { productSlug: "b", qty: -1, unit: "Palet" }, // geçersiz miktar ve birim
        null,
        42,
      ]),
    ).toEqual([
      { productSlug: "a", qty: 3, unit: "Kutu" },
      { productSlug: "b", qty: 1, unit: "Adet" },
    ]);
  });

  it("her store birbirinden bağımsızdır", () => {
    const first = makeStore();
    const second = makeStore();
    first.dispatch(lineUpserted({ productSlug: "a", qty: 1, unit: "Adet" }));
    expect(selectLineCount(second.getState())).toBe(0);
  });
});

describe("talep ve katmanlar", () => {
  it("sipariş talebi tek ürünü temizler; bilgi/soru tek ürünü taşır", () => {
    const store = makeStore();
    store.dispatch(productAsked({ type: "soru", product: { productSlug: "a", qty: 1, unit: "Adet" } }));
    expect(selectInquiry(store.getState())).toEqual({ type: "soru", product: { productSlug: "a", qty: 1, unit: "Adet" } });
    store.dispatch(orderRequested());
    expect(selectInquiry(store.getState())).toEqual({ type: "siparis", product: null });
    store.dispatch(inquiryCleared());
    expect(selectInquiry(store.getState())).toEqual({ type: null, product: null });
  });

  it("aynı anda yalnız bir katman açıktır", () => {
    const store = makeStore();
    store.dispatch(searchOpened());
    store.dispatch(quoteCartOpened());
    expect(selectOverlay(store.getState())).toBe("quoteCart");
    store.dispatch(overlayClosed());
    expect(selectOverlay(store.getState())).toBeNull();
  });
});
