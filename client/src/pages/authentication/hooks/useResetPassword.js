import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Post } from "../../../services/httpMethods";

const useResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email,setEmail]=useState(null)
  const navigate = useNavigate();
  const { token } = useParams();

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    if (!password || !confirmPassword) {
      setError("Veuillez remplir tous les champs de mot de passe");
      return;
    }

    try {
      const response = await Post("auth/reset-password", { password, token });
      setEmail(response?.email)
      setSuccess(true);
    } catch (error) {
      console.error("Erreur lors de la réinitialisation du mot de passe :", error);    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleResetPassword();
    }
  };
  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    success,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    handleResetPassword,
    navigate,
    handleKeyPress,
    email
  };
};

export default useResetPassword;
