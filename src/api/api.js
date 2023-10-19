import axios from 'axios';

// Usa la variable de entorno REACT_APP_API_BASE_URL para determinar la URL base
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Configura una instancia de axios con la URL base y cualquier otra configuración global que desees
const api = axios.create({
  baseURL: BASE_URL,
  // Puedes agregar headers globales aquí si es necesario, por ejemplo:
  // headers: {
  //   'Content-Type': 'application/json',
  //   'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`
  // }
});

// Función para hacer una petición GET
export const get = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para hacer una petición POST
export const post = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para hacer una petición PUT
export const put = async (endpoint, data) => {
  try {
    const response = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para hacer una petición DELETE
export const del = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Exporta la instancia de axios en caso de que necesites configuraciones personalizadas en algún lugar específico
export default api;
