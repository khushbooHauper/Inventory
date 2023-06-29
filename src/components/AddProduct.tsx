import React, { useState, useRef ,useEffect} from "react";
import "../assets/styles/addproduct.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useDispatch ,useSelector} from 'react-redux';
import { Product, addProduct, updateProduct } from "../redux/features/productSlice";
import {useNavigate,useParams} from 'react-router-dom'
import { RootState } from '../redux/store';

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Get the ID from the URL
  const productId = id ?? ''; // Set a default value of '' when id is undefined

  const products = useSelector((state: RootState) => state.product.products);
  const product = products.find((product) => product.id === parseInt(productId));
  const [name, setName] = useState<string>(product?.name || "");
  const [des, setDes] = useState<string>(product?.name ||"");
  const [category, setCategory] = useState<string>(product?.category ||"");
  const [subcategory, setSubCategory] = useState<string>(product?.subcategory ||"");
  const [quantity, setQuantity] = useState<number>(product?.quantity ||0);
  const [sku, setSku] = useState<string>(product?.sku ||"");
  const [price, setPrice] = useState<number>(product?.price ||0);
  const [weight, setWeight] = useState<number>(product?.weight ||0);
  const [status, setStatus] = useState<string>(product?.status ||"");
  
const [selectedImages, setSelectedImages] = useState<File[]>(product?.selectedImages || []);
const [selectedImageURLs, setSelectedImageURLs] = useState<string[]>([]); // Store object URLs for display
  useEffect(() => {
    if (id) {
     
      if (product) {
        setFormData(product);
      }
    }
  }, [id, products]);
 
  const [formData, setFormData] = useState<Product>({
      id:0,
      name: name,
      des: des,
      category: category,
      subcategory: subcategory,
      quantity:quantity,
      sku: sku,
      price: price,
      weight: weight,
      status:status,
      selectedImages:selectedImages ,
    // Add other form fields
  });
 
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue)) {
      setQuantity(parsedValue);
    }
  };
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const parsedValue = parseFloat(newValue);

    if (!isNaN(parsedValue)) {
      setPrice(parsedValue);
    }
  };
  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const parsedValue = parseFloat(newValue);

    if (!isNaN(parsedValue)) {
      setWeight(parsedValue);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleLabelClick = () => {
    fileInputRef.current?.click(); // Trigger the click event of the hidden file input
  };
  const getImageUrl = (file: File) => {
    return URL.createObjectURL(file);
  };

  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const images = Array.from(files).slice(0, 10); // Limit to first 10 images
      setSelectedImages(images);
      // Create object URLs for selected images
      const imageUrls = images.map((image) => getImageUrl(image));
      setSelectedImageURLs(imageUrls);
    }
  };

  useEffect(() => {
    if (product) {
      setSelectedImages(product.selectedImages || []);
      // Create object URLs for selected images
      const imageUrls = (product.selectedImages || []).map((image) => getImageUrl(image));
      setSelectedImageURLs(imageUrls);
    }
  }, [product]);
  
  

  // const handleSubmit = () => {
  //   let product = {
  //     id: Date.now(),
  //     name: name,
  //     des: des,
  //     category: category,
  //     subcategory: subcategory,
  //     quantity: quantity,
  //     sku: sku,
  //     price: price,
  //     weight: weight,
  //     status:status,
  //     selectedImages: selectedImages,
  //   };
  //   console.log("product", product);
  // };
  // const handleAddProduct = () => {
  //   dispatch(addProduct({ 
  //     id: Date.now(),
  //     name: name,
  //     des: des,
  //     category: category,
  //     subcategory: subcategory,
  //     quantity: quantity,
  //     sku: sku,
  //     price: price,
  //     weight: weight,
  //     status:status,
  //     selectedImages:[] }));
  //   setName('');
  //   // Redirect to the table page or perform any navigation logic
  //   navigate('/products')
  // };
  
  const handleFormSubmit = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (id) {
      dispatch(updateProduct(formData));
    } else {
      
      let newId = products.length + 1
      dispatch(addProduct({id: newId ,sku,name,price,des, category, subcategory, quantity,weight, selectedImages, status}))
    }

    navigate('/products');
  };
  
  return (
    <div className="addProduct">
      <div className="left-boxes">
        <div className="box-1">
          <h5>Description</h5>
          <input
            placeholder="product name"
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            rows={4 as number}
            cols={40 as number}
            placeholder="product description"
            className="disable-resize"
            value={des}
            onChange={(e) => setDes(e.target.value)}
          ></textarea>
        </div>
        <div className="box-2">
          <h5>Category</h5>
          <input
            placeholder="product category"
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            placeholder="product subcategory"
            className="input"
            value={subcategory}
            onChange={(e) => setSubCategory(e.target.value)}
          />
        </div>
        <div className="box-3">
          <h5>Inventory</h5>
          <input
            placeholder="Quantity"
            className="input"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <input
            placeholder="SKU"
            className="input"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
        </div>
        <div className="box-4">
          <h5>Price</h5>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              aria-label="Amount (to the nearest dollar)"
              placeholder="Price"
              className="price"
              value={price}
              onChange={handlePriceChange}
            />
          </InputGroup>
        </div>
      </div>
      <div className="right-boxes">
        <div className="box-5">
          <h5>Product Images</h5>
          <div>
            <label
              htmlFor="file-input"
              className="custom-file-upload"
              onClick={handleLabelClick}
            >
              Select Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              ref={fileInputRef}
              className="hidden"
            />

            <div>
              {selectedImages.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index}`}
                  className="image-product"
                />
              ))}
            </div>
          </div>
        {/* {selectedImages.map((image, index) => (
          <img
            key={index}
            src={getImageUrl(image)}
            alt={`Image ${index}`}
            className="image-product"
          />
        ))} */}
        </div>
        <div className="box-6">
          <h5>Shipping and Delivery</h5>

          <InputGroup className="mb-3">
            <Form.Control
              aria-label="Text input with dropdown button"
              placeholder="Item weight"
              className="weight"
              value={weight}
              onChange={handleWeightChange}
            />

            <DropdownButton
              variant="outline-secondary"
              title="kg"
              id="input-group-dropdown-2"
              align="end"
            >
              <Dropdown.Item href="#">Ltr</Dropdown.Item>
              <Dropdown.Item href="#">Ml</Dropdown.Item>
              <Dropdown.Item href="#">gram</Dropdown.Item>
            </DropdownButton>
          </InputGroup>
          <input
            placeholder="status"
            className="input"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <Button variant="dark" type="submit" onClick={handleFormSubmit}>
        {id ? 'Update Product' : 'Add Product'}
        </Button>
      </div>
    </div>
  );
};

export default AddProduct;


