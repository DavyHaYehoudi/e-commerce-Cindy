import { useState } from "react";
import { handleFetchError } from "../../../services/errors/handleFetchError";
import { Post } from "../../../services/httpMethods";

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

    try {
      setLoading(true);
      await Post("auth/request-password-reset", { email });
      setLoading(false);
      setResetSent(true);
      setError(null);
    } catch (error) {
      handleFetchError(error);
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
