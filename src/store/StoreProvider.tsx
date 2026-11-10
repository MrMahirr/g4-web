"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./index";
import { readStoredLines } from "./persistence";
import { cartHydrated } from "./slices/quoteCartSlice";

/** Redux store'u sağlar ve kayıtlı teklif listesini tarayıcıda bir kez yükler. */
export function StoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState(makeStore);

  useEffect(() => {
    store.dispatch(cartHydrated(readStoredLines()));
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
