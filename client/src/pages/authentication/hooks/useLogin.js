import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { customFetch } from "../../../services/customFetch";
import { toast } from "react-toastify";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await customFetch("auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem("token", response.token);
      if (response.isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/account");
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
