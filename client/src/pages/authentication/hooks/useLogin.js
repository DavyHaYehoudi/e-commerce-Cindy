import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const url = `${baseUrl}/${"auth/login"}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data?.token);

        if (data?.isAdmin) {
          navigate("/admin/dashboard");
        } else {
          navigate("/account");
        }
      } else {
        if (data?.message === "Adresse e-mail non vérifiée.") {
          toast.error(
            "Adresse e-mail non vérifiée. Veuillez vérifier votre boîte de réception pour le lien de vérification."
          );
        } else {
          toast.error(
            data?.message ||
              "Une erreur est survenue avec les informations fournies."
          );
        }
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      toast.error("Une erreur est survenue avec les informations fournies.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return {
    email,
    password,
    showPassword,
    forgotPassword,
    handleLogin,
    togglePasswordVisibility,
    handleChangeEmail,
    handleChangePassword,
  };
};

export default useLogin;
