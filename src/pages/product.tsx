import React, { useEffect, useState } from "react";
import TableProduct from "../components/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "../assets/styles/product.scss";
import { debounce } from "lodash"; // Import the debounce function

function Product() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  // Debounce the search query with a delay of 300ms
  const debouncedSearch = debounce((query: string) => {
   }, 1000);

  useEffect(() => {
    // Call the debounced search function when the search query changes
    debouncedSearch(searchQuery);

    // Clean up the debounce timer when the component unmounts
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery]);
  return (
    <div className="product">
      <div className="top-box">
        <div>
          <i className="fa fa-search myicon-search" aria-hidden="true"></i>
          <input
            className="search"
            placeholder="search product..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
        <Button variant="dark" onClick={handleAddProduct}>
          Add New Product
        </Button>
      </div>
      <div className="table-box">
        <TableProduct searchQuery={searchQuery} />
      </div>
    </div>
  );
}

export default Product;
