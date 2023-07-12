import React, { useState, useRef, useEffect } from "react";
import "../assets/styles/addproduct.scss";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import {
 addProduct,
updateProduct,
} from "../redux/features/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { useEdit } from "../hooks/useEdit";
import { toast } from "react-toastify";
import { FormikProps, useFormik } from "formik";
import { validationSchemaAddProduct } from "../validation/addproduct";
import moment from "moment";
import { Category } from "../types/product";





const categories: Category[] = [
  { name: "Electronics", subcategories: ["Mobile Phones", "Laptops", "Televisions","Watches"] },
  { name: "Apparel", subcategories: ["Men's Clothing", "Women's Clothing", "Children's Clothing"] },
  { name: "Home and Kitchen", subcategories: ["Cookware", "Appliances", "Furniture"] },
  { name: "Beauty and Personal Care", subcategories: ["Skincare", "Haircare", "Makeup"] },
  { name: "Health and Fitness", subcategories: ["Fitness Equipment", "Supplements", "Yoga and Meditation"] },
  { name: "Automotive", subcategories: ["Car Accessories", "Motorcycle Accessories", "Tools and Equipment"] },
  { name: "Books and Media", subcategories: ["Books", "Music", "Movies"] },
  { name: "Toys and Games", subcategories: ["Action Figures", "Board Games", "Puzzles"] },
  { name: "Sports and Outdoor", subcategories: ["Outdoor Recreation", "Sports Equipment", "Camping Gear"] },
  { name: "Industrial and Tools", subcategories: ["Power Tools", "Safety Equipment", "Hardware"] }
];


const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const { id } = useParams<{ id: string }>(); // Get the ID from the URL
  const productId = id ?? ""; // Set a default value of '' when id is undefined

  const products = useSelector((state: RootState) => state.product.products);
  const product = products.find(
    (product) => product.id === parseInt(productId)
  );

  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleLabelClick = () => {
    fileInputRef.current?.click(); // Trigger the click event of the hidden file input
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    formik: FormikProps<any>
  ) => {
    const files = event.target.files;
    if (files) {
      const imagesArray = Array.from(files).slice(0, 4); // Limiting the array to 4 images;
      setSelectedImages(imagesArray);

      // Convert images to Base64 strings
      const imagePromises: Promise<string>[] = imagesArray.map(
        (image: File) => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64String = reader.result as string;
              resolve(base64String);
            };
            reader.readAsDataURL(image);
          });
        }
      );

      // Set selectedImages field value as an array of Base64 strings
      Promise.all(imagePromises).then((base64Images) => {
        formik.setFieldValue("selectedImages", base64Images);
        formik.setFieldTouched("selectedImages", true, false);
      });
    }
  };

  const handleFormSubmission = async () => {
    const { ...values } = formik.values; // Extracting the form values

    if (productId) {
      // Performing update operation
      try {
        await handleUpdateProduct(parseInt(productId), values);
        AfterEdit(true, null);
      } catch (error) {
        AfterEdit(false, error);
      }
    } else {
      // Performing add operation
      let newId = 1; // Set a default ID

      if (products.length > 0) {
        // Check if there are existing products
        const highestId = Math.max(...products.map((product) => product.id));
        newId = highestId + 1;
      }
      dispatch(
        addProduct({
          id: newId,
          createdAt: moment().format("DD-MM-YYYY, HH:mm"), 
          ...values,
        })
      );
    }
    navigate("/products");
  };

  const handleUpdateProduct = async (
    productId: number,
    updatedData: any
  ): Promise<void> => {
    dispatch(updateProduct({ id: productId, ...updatedData }));
  };

  const AfterEdit = (isSuccess: boolean, result: any) => {
    if (isSuccess) {
      toast.success("Product updated successfully");
    } else {
      toast.error("Error updating product");
    }
  };

  const {
    EditById,
    showConfirmation,
    editFinally,
    handleCancel,
    loading,
    error,
    isSuccess,
    idToEdit,
    updatedData,
  } = useEdit({ editFunction: handleUpdateProduct, handleResponse: AfterEdit });

  const formik = useFormik({
    initialValues: {
      name: product?.name || "", // Provide initial value for the name field
      brand: product?.brand || "",
      model: product?.model || "",
      modelNumber: product?.modelNumber || null,
      sku: product?.sku || "",
      des: product?.des || "",
      selectedImages: product?.selectedImages || [],
      category: product?.category || "",
      subcategory: product?.subcategory || "",
      status: product?.status || "",
      price: product?.price || null,
      weight: product?.weight || null,
      dimensions: product?.dimensions || "",
      manufacturer: product?.manufacturer || "",
      quantity: product?.quantity || null,
    },
    validationSchema: validationSchemaAddProduct,
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
    },
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setSelectedSubcategory("");
  };

  const handleSubcategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const subcategory = event.target.value;
    setSelectedSubcategory(subcategory);
  };
  const selectedCategoryData = categories.find((category) => category.name === selectedCategory);
  const subcategories = selectedCategoryData ? selectedCategoryData.subcategories : [];
  return (
    <div style={{maxHeight:'100vh',overflowY:'scroll'}}>
      <div className="addProduct">
        <div className="left-boxes">
          <div className="box-1">
            <h5>Description</h5>
            <div className="box-1-first">
              <div>
                <input
                  placeholder="product name"
                  type="text"
                  className="input"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div>
                  {formik.touched.name && formik.errors.name && (
                    <div className="error-message">{formik.errors.name}</div>
                  )}
                </div>
              </div>

              <div>
                <input
                  placeholder="product brand"
                  type="text"
                  className="input"
                  name="brand"
                  value={formik.values.brand}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                <div>
                  {formik.touched.brand && formik.errors.brand && (
                    <div className="error-message">{formik.errors.brand}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="box-1-second">
              <div>
                <input
                  placeholder="product model"
                  type="text"
                  className="input"
                  name="model"
                  value={formik.values.model}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div>
                  {formik.touched.model && formik.errors.model && (
                    <div className="error-message">{formik.errors.model}</div>
                  )}
                </div>
              </div>

              <div>
                <input
                  placeholder="model number"
                  type="text"
                  className="input"
                  name="modelNumber"
                  value={
                    formik.values.modelNumber === null
                      ? ""
                      : formik.values.modelNumber
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div>
                  {formik.touched.modelNumber && formik.errors.modelNumber && (
                    <div className="error-message">
                      {formik.errors.modelNumber}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="box-1-third">
              <textarea
                rows={4 as number}
                cols={40 as number}
                placeholder="product description"
                className="disable-resize"
                name="des"
                value={formik.values.des}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              {formik.touched.des && formik.errors.des && (
                <div className="error-message">{formik.errors.des}</div>
              )}
            </div>
          </div>
          <div className="box-2">
            <h5>Category</h5>
            <div className="box-2b">
            <div>
            <select
          id="category"
          className="input"
          name="category"
          value={formik.values.category}
          onChange={(event) => {
            formik.handleChange(event);
            handleCategoryChange(event);
          }}
          onBlur={formik.handleBlur}
        >
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        {formik.touched.category && formik.errors.category && (
          <div className="error-message">{formik.errors.category}</div>
        )}
            </div>

              <div>
              <select
          id="subcategory"
          className="input"
          name="subcategory"
          value={formik.values.subcategory}
          onChange={(event) => {
            formik.handleChange(event);
            handleSubcategoryChange(event);
          }}
          onBlur={formik.handleBlur}
          disabled={!selectedCategory}
        >
          <option value="">Select subcategory</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory} value={subcategory}>
              {subcategory}
            </option>
          ))}
        </select>
        {formik.touched.subcategory && formik.errors.subcategory && (
          <div className="error-message">{formik.errors.subcategory}</div>
        )}
              </div>
            </div>
          </div>
          <div className="box-3">
            <h5>Inventory</h5>
            <div className="box-3b">
              <div>
                <input
                  placeholder="Quantity"
                  className="input"
                  type="text"
                  name="quantity"
                  value={
                    formik.values.quantity === null
                      ? ""
                      : formik.values.quantity
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.quantity && formik.errors.quantity && (
                  <div className="error-message">{formik.errors.quantity}</div>
                )}
              </div>
              <div>
                <input
                  placeholder="SKU"
                  className="input"
                  name="sku"
                  value={formik.values.sku}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.sku && formik.errors.sku && (
                  <div className="error-message">{formik.errors.sku}</div>
                )}
              </div>
            </div>
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
                onChange={(event) => {
                  handleImageChange(event, formik);
                  formik.setFieldValue(
                    "selectedImages",
                    Array.from(event.currentTarget.files || [])
                  );
                }}
                ref={fileInputRef}
                className="hidden"
                name="selectedImages"
                onBlur={formik.handleBlur}
              />

              {formik.errors.selectedImages && (
                <div className="error-message">
                  {formik.errors.selectedImages}
                </div>
              )}

              {formik.values.selectedImages.length > 0 && (
                <div className="uploaded-images">
                  {formik.values.selectedImages.map(
                    (image: any, index: number) => (
                      <div key={index}>
                        <p>{image.name}</p>
                        <img alt="Product" src={image} />
                        <br />
                        {/* <button onClick={() => removeImage(index)}>Remove</button> */}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="box-6">
            <h5>Shipping and Delivery(In Kg)</h5>
            <div className="box-6-inside">
              <div>
                <input
                  placeholder="Item weight"
                  className="weight"
                  name="weight"
                  value={
                    formik.values.weight === null ? "" : formik.values.weight
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.weight && formik.errors.weight && (
                  <div className="error-message">{formik.errors.weight}</div>
                )}
              </div>
              <div>
              <select
                className="input"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {formik.touched.status && formik.errors.status && (
                <div className="error-message">{formik.errors.status}</div>
              )}
            </div>
            </div>
            <div className="box-6-inside">
              <div>
                <input
                  placeholder="dimensions"
                  className="input"
                  name="dimensions"
                  value={formik.values.dimensions}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.dimensions && formik.errors.dimensions && (
                  <div className="error-message">
                    {formik.errors.dimensions}
                  </div>
                )}
              </div>
              <div>
                <input
                  placeholder="manufacturer"
                  className="input"
                  name="manufacturer"
                  value={formik.values.manufacturer}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.manufacturer && formik.errors.manufacturer && (
                  <div className="error-message">
                    {formik.errors.manufacturer}
                  </div>
                )}
              </div>
            </div>

            <div className="box-6-third">
              <input
                placeholder="Price"
                className="price"
                name="price"
                value={formik.values.price === null ? "" : formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.price && formik.errors.price && (
                <div className="error-message">{formik.errors.price}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="add-btn">
        <Button
          variant="dark"
          type="submit"
          onClick={handleFormSubmission}
          disabled={
            !formik.isValid ||
            !formik.dirty ||
            formik.values.selectedImages.length === 0
          }
        >
          {id ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </div>
  );
};

export default AddProduct;
