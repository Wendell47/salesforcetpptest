import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
	baseURL: apiUrl,
});

export default apiClient;
