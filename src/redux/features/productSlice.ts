// productSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  sku: string;
  name: string;
  price: string | number;
  des: string;
  category: string;
  subcategory: string;
  quantity: string | number;
  weight: string | number;
  selectedImages:  File[] | string[];
  status: string;
}

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadProducts: (state) => {
      const serializedState = localStorage.getItem("products");
      if (serializedState) {
        state.products = JSON.parse(serializedState);
      }
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      saveState(state.products);
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      saveState(state.products);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const { id, ...updatedProduct } = action.payload;
      const productIndex = state.products.findIndex(
        (product) => product.id === id
      );
      if (productIndex !== -1) {
        state.products[productIndex] = {
          ...state.products[productIndex],
          ...updatedProduct,
        };
        saveState(state.products);
      }
    },
  },
});

export const { addProduct, removeProduct, updateProduct, loadProducts } =
  productSlice.actions;
export default productSlice.reducer;
const saveState = (products: Product[]) => {
  try {
    const serializedState = JSON.stringify(products);
    localStorage.setItem("products", serializedState);
  } catch (err) {
    // Handle error while saving state
  }
};
