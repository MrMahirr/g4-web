import { createSlice } from "@reduxjs/toolkit";

/** Aynı anda yalnız bir katman açık olabilir. */
export type Overlay = "search" | "mobileNav" | "quoteCart";

export interface UiState {
  overlay: Overlay | null;
}

const initialState: UiState = { overlay: null };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    searchOpened(state) {
      state.overlay = "search";
    },
    mobileNavOpened(state) {
      state.overlay = "mobileNav";
    },
    quoteCartOpened(state) {
      state.overlay = "quoteCart";
    },
    overlayClosed(state) {
      state.overlay = null;
    },
  },
  selectors: {
    selectOverlay: (state) => state.overlay,
  },
});

export const { searchOpened, mobileNavOpened, quoteCartOpened, overlayClosed } = uiSlice.actions;
export const { selectOverlay } = uiSlice.selectors;
export default uiSlice;
