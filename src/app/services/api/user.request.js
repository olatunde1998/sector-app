// import { apiService } from "../index";
import {apiService} from "../index"

/** users. The React-Query key is "CreateUsersApi" */
export const CreateUsersApi = async (data) => {
  const payload = { ...data };
  const response = await apiService.post({
    url: `/users`,
    payload,
  });
  return response;
};

/** users. The React-Query key is "getUsersApi" */
export const getUsersApi = async () => {
  const response = await apiService.get('/users');
  return response;
};


/** Users. The React-Query key is "getUsersApi" */
export const getUserDetailsApi = async (id) => {
  const response = await apiService.get(`/users/${id}`);
  return response;
};

export const EditUserApi = async ({data, id}) => {
  const payload = { ...data };
  const response = await apiService.put({
    url: `/users/${id}`,
    payload,
  });
  return response;
};

export const DeleteUserApi = async ({data, id}) => {
  const payload = { ...data };
  const response = await apiService.delete({
    url: `/users/${id}`,
    payload,
  });
  return response;
};


/** sector. The React-Query key is "CreateSectorsApi" */
export const CreateSectorsApi = async (data) => {
  const payload = { ...data };
  const response = await apiService.post({
    url: `/sector`,
    payload,
  });
  return response;
};


/** sector. The React-Query key is "getUsersApi" */
export const getSectorsApi = async () => {
  const response = await apiService.get('/sector');
  return response;
};