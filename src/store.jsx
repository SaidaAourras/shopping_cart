import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./slices/ProductSlice";
import CartSlice from "./slices/CartSlice";

const store = configureStore({
  reducer: {
    products: ProductSlice,
    carts: CartSlice,
  },
});
