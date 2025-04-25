//api/server-utils/utils.ts
import axios from "axios";

const SWAGGER_API_URL = process.env.NEXT_PUBLIC_SWAGGER_API_BASE_URL
  ? `${process.env.NEXT_PUBLIC_SWAGGER_API_BASE_URL}${process.env.NEXT_PUBLIC_SWAGGER_API_VERSION}`
  : null;

if (!SWAGGER_API_URL) {
  throw new Error("Swagger API URL is not configured");
}

const getDefaultHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Basic ${Buffer.from("admin:heyoo!").toString("base64")}`,
});

const apiClient = axios.create({
  baseURL: SWAGGER_API_URL,
  headers: getDefaultHeaders(),
});

export const apiClientWithToken = (token: string) => {
  return axios.create({
    baseURL: SWAGGER_API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
