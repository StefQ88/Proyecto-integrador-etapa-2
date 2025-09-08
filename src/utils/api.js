import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // http://localhost:4000/api/
});

// GET /api/products
export const getProducts = async () => {
  const resp = await axiosInstance.get("products");
  return resp.data.products;
};

// POST /api/products  (form-data)
export const postProduct = async (body) => {
  const formData = new FormData();
  Object.entries(body).forEach(([key, value]) => formData.append(key, value));

  const resp = await axiosInstance.post("products", formData);
  return resp.data.product;
};

// POST /api/contacts
export const postContact = async (body) => {
  const resp = await axiosInstance.post("contacts", body);
  return resp.data;
};

// GET /api/products/:id
export const getProductById = async (id) => {
  const resp = await axiosInstance.get(`products/${id}`);
  return resp.data;
};
