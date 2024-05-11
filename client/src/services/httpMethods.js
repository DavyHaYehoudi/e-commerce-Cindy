import { customFetch } from "./customFetch";

export const Get = async (endpoint, options, unauthorizedCallback) => {
  return customFetch(
    endpoint,
    { method: "GET", ...options },
    unauthorizedCallback
  );
};

export const Post = async (endpoint, body, options, unauthorizedCallback) => {
  return customFetch(
    endpoint,
    {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    },
    unauthorizedCallback
  );
};

export const Put = async (endpoint, body, options, unauthorizedCallback) => {
  return customFetch(
    endpoint,
    {
      method: "PUT",
      body: JSON.stringify(body),
      ...options,
    },
    unauthorizedCallback
  );
};
export const Patch = async (endpoint, body, options, unauthorizedCallback) => {
  return customFetch(
    endpoint,
    {
      method: "PATCH",
      body: JSON.stringify(body),
      ...options,
    },
    unauthorizedCallback
  );
};

export const Del = async (endpoint, options, unauthorizedCallback) => {
  return customFetch(
    endpoint,
    { method: "DELETE", ...options },
    unauthorizedCallback
  );
};
