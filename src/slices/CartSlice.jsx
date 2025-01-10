import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      // Check if the product already exists in the cart
      const existingProduct = state.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        // If it exists, increment the quantity
        existingProduct.quantity += 1;
      } else {
        // If it's a new product, add it to the cart with quantity 1
        state.cartItems.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      // Filter out the product to remove it from the cart
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    incrementQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.cartItems.find((item) => item.id === productId);
      if (product) {
        product.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.cartItems.find((item) => item.id === productId);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
