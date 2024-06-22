import { Navigate } from "react-router-dom";

const useAuthWrappers = () => {
  const requireAuth =
    (expectedRole) =>
    ({ children }) => {
      const localStorageToken = localStorage.getItem("token");
      if (!localStorageToken) {
        return <Navigate to="/" replace />;
      }
      const tokenParse = JSON.parse(atob(localStorageToken.split(".")[1]));
      if (tokenParse?.role !== expectedRole) {
        return <Navigate to="/" replace />;
      }
      return children;
    };

  const RequireAuthAdmin = requireAuth("admin");
  const RequireAuthUser = requireAuth("user");

  const role = () => {
    const localStorageToken = localStorage.getItem("token");
    if (!localStorageToken) {
      return null;
    }
    const tokenParse = JSON.parse(atob(localStorageToken.split(".")[1]));
    return tokenParse?.role || null;
  };
  const clientId = () => {
    const localStorageToken = localStorage.getItem("token");
    if (!localStorageToken) {
      return null;
    }
    const tokenParse = JSON.parse(atob(localStorageToken.split(".")[1]));
    return tokenParse?.clientId || null;
  };

  return { RequireAuthAdmin, RequireAuthUser, role, clientId };
};

export default useAuthWrappers;
