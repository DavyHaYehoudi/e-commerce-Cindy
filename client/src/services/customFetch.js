import checkToken from "../pages/dashboards/utils/checkToken";
import { handleFetchError } from "./handleFetchError";

export const customFetch = async (
  endpoint,
  options = {},
  unauthorizedCallback
) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const url = `${baseUrl}/${endpoint}`;
  const token = localStorage.getItem("token");
  const checkTokenBoolean = checkToken();

  const defaultOptions = {
    method: "GET",
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
        response.status === 403 ||
        checkTokenBoolean
      ) {
        console.log(
          "(response.status === 401 || response.status === 403 || checkTokenBoolean)"
        );
        unauthorizedCallback();
      }
      const errorDefault = `HTTP error! Status: ${response.status} `;
      const errorApi = data?.message;
      throw new Error(errorApi || errorDefault);
    }

    return data;
  } catch (error) {
    handleFetchError(error);
  }
};
