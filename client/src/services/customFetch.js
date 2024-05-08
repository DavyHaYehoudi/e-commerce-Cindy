import { handleFetchError } from "./handleFetchError";

export const customFetch = async (
  endpoint,
  options = {},
  unauthorizedCallback
) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const url = `${baseUrl}/${endpoint}`;
  const token = localStorage.getItem("token");

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();
    if (!response.ok) {
      if (
        response.status === 401 ||
        response.status === 403  
      ) {
        unauthorizedCallback();
      }
      const errorDetails = {
        status: response.status,
        message: data?.message,
      };
      throw new Error(JSON.stringify(errorDetails));
    }

    return data;
  } catch (error) {
    handleFetchError(error);
  }
};
