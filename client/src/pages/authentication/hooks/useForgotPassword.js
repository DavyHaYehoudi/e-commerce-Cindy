import { useState } from "react";

const useForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!validateEmail(email)) {
      setError("Veuillez saisir une adresse e-mail valide.");
      return;
    }

    const baseUrl = process.env.REACT_APP_BASE_URL;
    const url = `${baseUrl}/${"auth/request-password-reset"}`;
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setLoading(false);
        setResetSent(true);
        setError(null);
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la demande de réinitialisation du mot de passe :",
        error
      );
      setError(
        "Erreur serveur lors de la demande de réinitialisation du mot de passe."
      );
    } finally {
      setLoading(false);
    }
  };
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleResetPassword();
    }
  };

  return {
    email,
    setEmail,
    resetSent,
    error,
    loading,
    handleResetPassword,
    handleKeyPress,
  };
};

export default useForgotPassword;
