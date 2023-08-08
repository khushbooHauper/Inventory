import * as Yup from 'yup';



export const validationSchemaAddProduct = Yup.object().shape({
    name: Yup.string().required('Product name is required'),
    brand: Yup.string().required("Brand is required"),
    model: Yup.string().required("Model is required"),
    modelNumber: Yup.string().required("Model number is required"),
    des: Yup.string().required('Product description is required'),
    category: Yup.string().required('Product category is required'),
    subcategory: Yup.string().required('Product subcategory is required'),
    quantity:  Yup.number()
    .typeError('Quantity must be a number')
    .required('Quantity is required')
    .positive('Quantity must be a positive number'),
    sku: Yup.string().required('SKU is required'),
    price: Yup.number().required('Price is required').positive(),
    weight: Yup.number()
    .typeError('Weight must be a number')
    .required('Weight is required')
    .positive('Weight must be a positive number'),
    status: Yup.string().oneOf(['active', 'inactive']),
    dimensions: Yup.string()
    .matches(/^[0-9]+(\s*x\s*[0-9]+){2}$/, '(Ex: length x width x height)')
    .required('Dimensions is required'),
    manufacturer: Yup.string().required("Manufacturer is required"),
    selectedImages: Yup.array()
    .min(1, "Please select at least one image")
    .max(4, "Maximum of 4 images allowed")
    .nullable(), // Allow null values
  });
  