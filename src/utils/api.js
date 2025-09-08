import axios from "axios";

// Instancia de axios con la baseURL de MockAPI
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Obtener todos los productos
export const getProducts = async () => {
  const resp = await axiosInstance.get("/products");
  return resp.data.products;
};

// Crear producto nuevo
export const postProduct = async (body) => {
  const resp = await axiosInstance.post("/products", body);
  return resp.data.products;
};

// Obtener producto por ID
export const getProductById = async (id) => {
  const resp = await axiosInstance.get(`products/${id}`);
  return resp.data;
};
