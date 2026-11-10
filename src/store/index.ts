import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { persistenceListener } from "./persistence";
import inquirySlice from "./slices/inquirySlice";
import quoteCartSlice from "./slices/quoteCartSlice";
import uiSlice from "./slices/uiSlice";

const rootReducer = combineSlices(quoteCartSlice, inquirySlice, uiSlice);

/** Her tarayıcı oturumu (ve her sunucu isteği) için ayrı store. */
export function makeStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(persistenceListener.middleware),
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];
