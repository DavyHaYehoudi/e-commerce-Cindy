import { useCallback, useEffect, useState } from "react";

const useClientFromToken = () => {
  const [clientId, setClientId] = useState(null);
  const [role, setRole] = useState(null);

  const getToken = useCallback(() => localStorage.getItem("token"), []);

  useEffect(() => {
    const token = getToken();
    if (token && token !== undefined) {
      const tokenData = JSON.parse(atob(token.split(".")[1])); // Décoder le payload du token
      setClientId(tokenData.clientId);
      setRole(tokenData.role);
    }
  }, [getToken]);

  console.log("role:", role, "clientId:", clientId);
  return { clientId, role, token: getToken() };
};

export default useClientFromToken;
