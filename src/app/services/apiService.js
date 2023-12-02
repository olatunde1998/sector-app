import axios from "axios";


const apiResource = (customHeaders = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_BASEURL;

  const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const fileHeaders = {
    ...customHeaders,
  };  

  const service = axios.create({
    baseURL: `${baseURL}`,
    withCredentials: false,
    headers: customHeaders ? fileHeaders: defaultHeaders,
  });


  return {
    get: async (url) => {
      try {
        const response = await service.get(url);
        return response.data;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    post: async ({ url, payload }) => {
      try {
        const response = await service.post(url, payload);
        return response.data;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    patch: async ({ url, payload }) => {
      try {
        const data = service.patch(url, payload);
        const resolvedData = await Promise.resolve(data);
        return resolvedData;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    delete: async ({ url, payload }) => {
      try {
        const data = service.delete(url, payload);
        const resolvedData = await Promise.resolve(data);
        return resolvedData;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    put: async ({ url, payload }) => {
      try {
        const data = service.put(url, payload);
        const resolvedData = await Promise.resolve(data);
        return resolvedData;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  };
};

export {apiResource}; 
export const apiService = apiResource();
