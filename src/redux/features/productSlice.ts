// productSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { Product, ProductState } from "../../types/product";



const initialState: ProductState = {
  products: [],
  totalWeight: 0,
  totalProducts: 0,
  totalInventoryValue: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadProducts: (state, action: PayloadAction<Product[]>) => {
      const serializedState = localStorage.getItem("products");
      if (serializedState) {
        state.products = JSON.parse(serializedState);
        state.totalWeight = calculateTotalWeight( state.products);
      state.totalProducts = state.products.length;
      state.totalInventoryValue = calculateTotalInventoryValue( state.products);
      saveState(state.products);
      }
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      const newProduct = {
        ...action.payload,
        createdAt: moment().format("DD-MM-YYYY, HH:mm"), // Add the createdAt property with the current date and time
      };
      state.products.push(newProduct);
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
const calculateTotalWeight = (products: Product[]): number => {
  return products.reduce((acc, product) => {
    if (product.weight !== null) {
      return acc + +product.weight;
    }
    return acc;
  }, 0);
};

const calculateTotalInventoryValue = (products: Product[]): number => {
  return products.reduce((acc, product) => {
    if (product.weight !== null) {
      return acc + (product.price || 0) * (product.quantity || 0);
    }
    return acc;
  }, 0);
};
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
