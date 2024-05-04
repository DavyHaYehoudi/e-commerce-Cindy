import { handleFetchError } from "./handleFetchError";

export const customFetch = async (endpoint, options = {}) => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const url = `${baseUrl}/${endpoint}`;
  
    const defaultOptions = {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      ...options,
    };
  
    try {
      const response = await fetch(url, defaultOptions);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
        handleFetchError(error);
    }
  };
  