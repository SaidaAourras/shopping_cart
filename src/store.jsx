import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./slices/ProductSlice";
import CartSlice from "./slices/CartSlice";

export const store = configureStore({
  reducer: {
    products: ProductSlice,
    carts: CartSlice,
  },
});
