import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
    if ( !email.trim() || !password.trim() ) {
        setError("Veuillez remplir tous les champs.");
        return;
      }
      if (!validateEmail(email)) {
        setError("Veuillez saisir une adresse e-mail valide.");
        return;
      }
    try {
      setLoading(true);
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
        setLoading(false);
        setError(false)

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
    handleKeyPress
  };
};

export default useLogin;
