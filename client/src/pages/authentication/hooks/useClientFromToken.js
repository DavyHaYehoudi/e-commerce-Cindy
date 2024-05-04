import { useEffect, useState } from "react";

const useClientFromToken = () => {
  const [clientId, setClientId] = useState(null);
  const [role, setRole] = useState(null);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      const tokenData = JSON.parse(atob(token.split(".")[1])); // Décoder le payload du token
      setClientId(tokenData.clientId);
      setRole(tokenData.role);
    }
  }, [token]);

  console.log("role:", role, "clientId:", clientId);
  return { clientId, role };
};

export default useClientFromToken;
