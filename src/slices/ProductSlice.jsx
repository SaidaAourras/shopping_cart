import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/products";

export const fetchFromAPI = createAsyncThunk(
  "products/fetchFromAPI",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    productsList: [],
    selectedProducts: [],
    loading: false,
    error: null,
  },
  reducers: {
    addToListProduct: (state, action) => {
      state.productsList.push(action.payload);
    },
    addToCart: (state, action) => {
      state.selectedProducts.push(action.payload);
    },
    remove: (state, action) => {
      state.selectedProducts = state.selectedProducts.filter(
        (product) => product.id !== action.payload
      );
    },
    update: (state, action) => {
      const index = state.productsList.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) state.productsList[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFromAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFromAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.productsList = action.payload;
      })
      .addCase(fetchFromAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addToListProduct, addToCart, remove, update } =
  productSlice.actions;
export default productSlice.reducer;
