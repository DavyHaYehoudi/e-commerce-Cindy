import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Post } from "../../../services/httpMethods";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //Récupération de l'email après l'inscription
  let { state } = useLocation();
  useEffect(() => {
    if (state) {
      setEmail(state);
    }
  }, [state]);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Veuillez saisir une adresse e-mail valide.");
      return;
    }
    try {
      setLoading(true);
      const data = await Post("auth/login", { email, password });
      localStorage.setItem("token", data?.token);
      setLoading(false);
      setError(false);
      if (data?.isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/account");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    } finally {
      setLoading(false);
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
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return {
    email,
    password,
    showPassword,
    forgotPassword,
    loading,
    error,
    handleLogin,
    togglePasswordVisibility,
    handleChangeEmail,
    handleChangePassword,
    handleKeyPress,
  };
};

export default useLogin;
