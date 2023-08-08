import React, { useEffect, useState } from "react";
import TableProduct from "../components/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "../assets/styles/product.scss";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Product } from "../types/product";

function ProductPage() {
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.product.products);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
  };
  const filter = () => {
    // Perform the filtering logic when the debounced search query changes
    const filtered: Product[] = products.filter((product) => {
      const productName = product.name.toLowerCase();
      const query = searchQuery.toLowerCase();
      return productName.includes(query);
    });
    setFilteredProducts(filtered);
  };

  const delayedFilter = debounce(filter, 1000);
  useEffect(() => {
    delayedFilter();

    return () => {
      delayedFilter.cancel();
    };
  }, [searchQuery, products]);

  return (
    <div className="product">
      <div className="top-box">
        <div>
          <i className="fa fa-search myicon-search" aria-hidden="true"></i>
          <input
            className="search"
            placeholder="search product..."
            value={searchQuery}
            onChange={handleChange}
          />
        </div>
        <Button variant="dark" onClick={handleAddProduct}>
          Add New Product
        </Button>
      </div>
      <div className="table-box">
        <TableProduct
          searchQuery={searchQuery}
          filteredProducts={filteredProducts}
        />
      </div>
    </div>
  );
}

export default ProductPage;
