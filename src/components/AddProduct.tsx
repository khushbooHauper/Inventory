import React, { useState, useRef, useEffect } from "react";
import "../assets/styles/addproduct.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch, useSelector } from "react-redux";
import {
  Product,
  addProduct,
  loadProducts,
  updateProduct,
} from "../redux/features/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { useEdit } from "../hooks/useEdit";
import { toast } from "react-toastify";
import { FormikProps, useFormik } from "formik";
import { validationSchemaAddProduct } from "../validation/addproduct";

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
      const imagesArray = Array.from(files);
      setSelectedImages(imagesArray);
      formik.setFieldValue("selectedImages", imagesArray); // Set selectedImages field value as an array
      formik.setFieldTouched("selectedImages", true, false); // Mark selectedImages field as touched and dirty
    }
  };
  
  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, formik: FormikProps<any>) => {
  //   const fileList = event.target.files;
  //   if (fileList) {
  //     const imagePromises: Promise<string>[] = Array.from(fileList).map((file) => {
  //       return new Promise<string>((resolve) => {
  //         const reader = new FileReader();
  //         reader.onloadend = () => {
  //           const base64String = reader.result as string;
  //           resolve(base64String);
  //         };
  
  //         // Create a new Blob object using the File object
  //         const blob = new Blob([file], { type: file.type });
  //         reader.readAsDataURL(blob);
  //       });
  //     });
  
  //     Promise.all(imagePromises).then((base64Images: string[]) => {
  //       const fileObjects = Array.from(fileList) as File[];
  //       formik.setFieldValue("selectedImages", fileObjects);
  //       formik.setFieldValue("base64Images", base64Images);
  //     });
  //   }
  // };
  
 
 
  
  
  
 
  
  
  
  
  
  
  

  // const removeImage = (index: number) => {
  //   const updatedImages = [...selectedImages];
  //   updatedImages.splice(index, 1);
  //   setSelectedImages(updatedImages);
  // };

  

 
  // const handleFormSubmission = async () => {
  //   const { ...values } = formik.values; // Extracting the form values
  
  //   if (productId) {
  //     // Performing update operation
  //     try {
        
  //       await handleUpdateProduct(parseInt(productId), values);
  //       AfterEdit(true, null); 
  //     } catch (error) {
  //       AfterEdit(false, error); 
  //     }
      
  //   } else {
  //     // Performing add operation
  //     const newId = products.length + 1;
  //     dispatch(
  //       addProduct({
  //         id: newId,
  //         ...values,
  //       })
  //     );
      
  //   }
  //   navigate("/products");
  // };
  


  const handleFormSubmission = async () => {
    const { selectedImages, ...values } = formik.values;
  // Convert File objects to base64 strings
  const imagePromises: Promise<string>[] = Array.from(selectedImages as ArrayLike<File>).map((image: File) => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.readAsDataURL(image);
    });
  });
  
    const base64Images: string[] = await Promise.all(imagePromises);
  
    const productData = {
      ...values,
      selectedImages: base64Images,
    };
  
    if (productId) {
      // Performing update operation
      try {
        await handleUpdateProduct(parseInt(productId), productData);
        AfterEdit(true, null);
      } catch (error) {
        AfterEdit(false, error);
      }
    } else {
      // Performing add operation
      const newId = products.length + 1;
      dispatch(
        addProduct({
          id: newId,
          ...productData,
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
    console.log(updatedData);
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
      des: product?.des || "",
      category: product?.category || "",
      subcategory: product?.subcategory || "",
      quantity: product?.quantity || "",
      sku: product?.sku || "",
      price: product?.price || "",
      weight: product?.weight || "",
      status: product?.status || "",
      selectedImages: product?.selectedImages || [],
    },
    validationSchema: validationSchemaAddProduct,
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
    },
  });
  
  return (
    <div className="addProduct">
      <div className="left-boxes">
        <div className="box-1">
          <h5>Description</h5>
          <input
            placeholder="product name"
            type="text"
            className="input"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="error-message">{formik.errors.name}</div>
          )}
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
        <div className="box-2">
          <h5>Category</h5>
          <div className="box-2b">
            <div>
              <input
                placeholder="product category"
                className="input"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.category && formik.errors.category && (
                <div className="error-message">{formik.errors.category}</div>
              )}
            </div>
            <div>
              <input
                placeholder="product subcategory"
                className="input"
                name="subcategory"
                value={formik.values.subcategory}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
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
                type="number"
                name="quantity"
                value={formik.values.quantity}
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
        <div className="box-4">
          <h5>Price</h5>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              aria-label="Amount (to the nearest dollar)"
              placeholder="Price"
              className="price"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </InputGroup>
          {formik.touched.price && formik.errors.price && (
            <div className="error-message">{formik.errors.price}</div>
          )}
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
            {/* <input
              type="file"
              accept="image/*"
              multiple
              onChange={(event) => handleImageChange(event, formik)}
              ref={fileInputRef}
              className="hidden"
              name="selectedImages"
              onBlur={formik.handleBlur}
            /> */}
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
{/*             
            {selectedImages.length > 0 && (
              <div className="uploaded-images">
                {selectedImages.map((image, index) => (
                  <div key={index}>
                    <img alt="not found" src={URL.createObjectURL(image)} />
                    <br />
                    <button onClick={() => removeImage(index)}>Remove</button>
                  </div>
                ))}
              </div>
            )} */}
           
           {formik.values.selectedImages.length > 0 && (
  <div className="uploaded-images">
    {formik.values.selectedImages.map((image: any, index: number) => (
      <div key={index}>
        <img alt="Product" src={image} />
        <br />
        {/* <button onClick={() => removeImage(index)}>Remove</button> */}
      </div>
    ))}
  </div>
)}
          </div>
        </div>
        <div className="box-6">
          <h5>Shipping and Delivery(In Kg)</h5>

          <InputGroup className="mb-3">
            <Form.Control
              aria-label="Text input with dropdown button"
              placeholder="Item weight"
              className="weight"
              name="weight"
              value={formik.values.weight}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </InputGroup>
          {formik.touched.weight && formik.errors.weight && (
            <div className="error-message">{formik.errors.weight}</div>
          )}
          <Form.Control
            placeholder="status"
            className="input"
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.status && formik.errors.status && (
            <div className="error-message">{formik.errors.status}</div>
          )}
        </div>
        <Button
          variant="dark"
          type="submit"
          onClick={handleFormSubmission}
          // disabled={!formik.isValid || !formik.dirty}
          disabled={!formik.isValid || !formik.dirty || formik.values.selectedImages.length === 0}
        >
          {id ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </div>
  );
};

export default AddProduct;
