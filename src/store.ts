import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import appSlice from "./slices/appSlice";

const store = configureStore({
  reducer: appSlice,
});

export default store;

// Type definitions
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
