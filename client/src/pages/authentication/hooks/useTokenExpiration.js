import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useTokenExpiration = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const tokenData = JSON.parse(atob(token.split(".")[1])); // Décoder le payload du token
      const currentTime = Math.floor(Date.now() / 1000); // Convertir en secondes
      if (tokenData.exp < currentTime) {
        // Le token a expiré, rediriger vers la page de connexion
        navigate("/account/login");
      } else {
        // Le token est valide, vérifier le rôle de l'utilisateur
        if (
          window.location.pathname.startsWith("/admin") &&
          tokenData.role !== "admin"
        ) {
          // L'utilisateur n'a pas le rôle d'administrateur, rediriger vers la page de connexion
          navigate("/account/login");
        }
      }
    } else {
      // Aucun token trouvé, rediriger vers la page de connexion
      navigate("/account/login");
    }
  }, [navigate]);

  return null;
};

export default useTokenExpiration;
