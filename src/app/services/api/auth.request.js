import { apiService } from "../index";

/** Login User. The React-Query key is "LoginUserApi" */
export const LoginUserApi = async (data) => {
	const payload = { ...data };
	const response = await apiService.post({
		url: "/auth/login",
		payload,
	});
	return response;
};

export const RegisterUserApi = async (data) => {
	const payload = { ...data };
	const response = await apiService.post({
		url: "/auth/register",
		payload,
	});
	return response;
};





