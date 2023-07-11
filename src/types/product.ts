export interface Product {
    id: number;
    name: string;
    brand:  string;
    model:string;
    modelNumber:number | null;
    sku: string;
    des: string;
    selectedImages:  File[] | string[];
    category: string;
    subcategory: string;
    status: string;
    price: number | null;
    weight: number | null;
    dimensions:string;
    manufacturer:string;
    quantity: number | null;
    createdAt: string; 
   }
  
  export interface ProductState {
    products: Product[];
    totalWeight: number;
    totalProducts: number;
    totalInventoryValue: number;
  }
  export type Category = {
    name: string;
    subcategories: string[];
  }