// productSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
    id:number,
    name: string,
    des: string,
    category: string,
    subcategory: string,
    quantity: number,
    sku: string,
    price: number,
    weight: number,
    selectedImages: File[],
    status:string,
}

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [{id:1, sku: 'UGG-BB-PUR-06',selectedImages: [
    new File([new Blob()], 'image1.jpg', { type: 'image/jpeg' }),
    new File([new Blob()], 'image2.jpg', { type: 'image/jpeg' }),
  ] ,name: 'Product 1', weight: 10, price: 100, quantity: 5 ,status:'active',des:'',category:'',subcategory:''},
  { id:2,sku: 'PMN-FR-PUI-12',selectedImages: [
    new File([new Blob()], 'image3.jpg', { type: 'image/jpeg' }),
    new File([new Blob()], 'image4.jpg', { type: 'image/jpeg' }),
  ] , name: 'Product 2', weight: 5, price: 50, quantity: 10 ,status:'inactive',des:'',category:'',subcategory:''},]
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    loadProducts: (state) => {
        const serializedState = localStorage.getItem('products');
        if (serializedState) {
          state.products = JSON.parse(serializedState);
        }
      },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      saveState(state.products);
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(product => product.id !== action.payload);
      saveState(state.products);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const { id, ...updatedProduct } = action.payload;
      const productIndex = state.products.findIndex(product => product.id === id);
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

export const { addProduct, removeProduct, updateProduct ,loadProducts} = productSlice.actions;
export default productSlice.reducer;
const saveState = (products: Product[]) => {
    try {
      const serializedState = JSON.stringify(products);
      localStorage.setItem('products', serializedState);
    } catch (err) {
      // Handle error while saving state
    }
  };