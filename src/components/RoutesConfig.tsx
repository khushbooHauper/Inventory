import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/login";
import ProductPage from "../pages/product";
import AddProduct from "./AddProduct";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/add-product/:id" element={<AddProduct />} />
    </Routes>
  );
};

export default RoutesConfig;
