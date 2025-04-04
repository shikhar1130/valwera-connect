
import { toast } from "sonner";

const API_URL = "http://localhost:5000/api";

interface RequestOptions {
  method: string;
  headers: Record<string, string>;
  body?: string;
}

const getToken = () => {
  return localStorage.getItem("valwera_token");
};

async function apiRequest<T>(
  endpoint: string,
  method: string = "GET",
  data?: any
): Promise<T> {
  const options: RequestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const token = getToken();
  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "An error occurred");
    }

    return responseData;
  } catch (error: any) {
    toast.error(error.message || "An error occurred");
    throw error;
  }
}

export const api = {
  get: <T>(endpoint: string) => apiRequest<T>(endpoint),
  post: <T>(endpoint: string, data: any) => apiRequest<T>(endpoint, "POST", data),
  put: <T>(endpoint: string, data: any) => apiRequest<T>(endpoint, "PUT", data),
  delete: <T>(endpoint: string) => apiRequest<T>(endpoint, "DELETE"),
};
