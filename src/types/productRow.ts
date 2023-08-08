import { Product } from "./product";

export type ProductRowProps = {
  product: Product;
  handleOpenView: (product: Product) => void;
  onDelete: (productId: number) => void;
  handleStatus: (productId: number) => void;
};
