import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const useResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const url = `${baseUrl}/${"auth/reset-password"}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, token }),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(
          data.message ||
            "Une erreur s'est produite lors de la réinitialisation du mot de passe"
        );
      }
    } catch (error) {
      setError(
        "Une erreur s'est produite lors de la réinitialisation du mot de passe"
      );
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
  };
};

export default useResetPassword;
