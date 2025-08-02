import axios from "axios";

// Instancia de axios con la baseURL de MockAPI
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Obtener todos los productos
export const getProducts = async () => {
  const resp = await axiosInstance.get(""); // "" = endpoint raíz de products
  return resp.data;
};

// Crear producto nuevo
export const postProduct = async (body) => {
  const resp = await axiosInstance.post("", body); // "" para POST a la colección products
  return resp.data;
};

// Obtener producto por ID
export const getProductById = async (id) => {
  const resp = await axiosInstance.get(`/${id}`);
  return resp.data;
};
