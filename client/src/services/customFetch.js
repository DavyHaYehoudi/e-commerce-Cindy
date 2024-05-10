import { handleFetchError } from "./errors/handleFetchError";

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
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        unauthorizedCallback();
      }
      const responseData = await response.json();
      const errorDetails = {
        status: response.status,
        message: responseData.message || "Une erreur est survenue",
        route: response.url
      };
      throw new Error(JSON.stringify(errorDetails));
    }
    return await response.json();
  } catch (error) {
    handleFetchError(error)
    // throw error;
  }
};
