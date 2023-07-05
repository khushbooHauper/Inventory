import * as Yup from 'yup';



export const validationSchemaAddProduct = Yup.object().shape({
    name: Yup.string().required('Product name is required'),
    des: Yup.string().required('Product description is required'),
    category: Yup.string().required('Product category is required'),
    subcategory: Yup.string().required('Product subcategory is required'),
    quantity: Yup.number().required('Quantity is required').positive().integer(),
    sku: Yup.string().required('SKU is required'),
    price: Yup.number().required('Price is required').positive(),
    weight: Yup.number().required('Weight is required').positive(),
    status: Yup.string().required('Status is required'),
    selectedImages: Yup.array()
    .min(1, "Please select at least one image")
    .max(4, "Maximum of 4 images allowed")
    .nullable(), // Allow null values
  });
  