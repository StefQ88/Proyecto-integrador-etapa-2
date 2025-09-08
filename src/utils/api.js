import axios from "axios";

// Normalizo la base para termine con "/"
const BASE_URL = (import.meta.env.VITE_BASE_URL || "").replace(/\/?$/, "/");

const axiosInstance = axios.create({
  baseURL: BASE_URL, // http://localhost:4000/api/
});

// Obtener todos los productos
export const getProducts = async () => {
  const resp = await axiosInstance.get("products"); //  .../api/products
  return resp.data.products;
};

// Crear producto nuevo (multipart/form-data)
export const postProduct = async (body) => {
  const formData = new FormData();
  Object.entries(body).forEach(([key, value]) => {
    if (value !== undefined && value !== null) formData.append(key, value);
  });

  const resp = await axiosInstance.post("products", formData);
  return resp.data.product;
};

// Obtener producto por ID
export const getProductById = async (id) => {
  const resp = await axiosInstance.get(`products/${id}`); // .../api/products/:id
  return resp.data;
};

// Contacto
// export const postContact = async (body) => {
//   const resp = await axiosInstance.post("contact", body);
//   return resp.data;
// };

export default axiosInstance;
