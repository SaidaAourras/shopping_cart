import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/products";

// Async thunk to fetch products from API
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
    filteredProducts: [],
    loading: false,
    error: null,
  },
  reducers: {
    addToListProduct: (state, action) => {
      state.productsList.push(action.payload);
      state.filteredProducts.push(action.payload);
    },

    // Removed the cart-related logic from here

    filterProducts: (state, action) => {
      const { category, searchTerm } = action.payload;
      state.filteredProducts = state.productsList.filter((product) => {
        const matchesCategory =
          !category ||
          product.category.toLowerCase() === category.toLowerCase();
        const matchesSearch =
          !searchTerm ||
          product.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      });
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
        state.filteredProducts = action.payload;
      })
      .addCase(fetchFromAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addToListProduct, filterProducts } = productSlice.actions;

export default productSlice.reducer;
