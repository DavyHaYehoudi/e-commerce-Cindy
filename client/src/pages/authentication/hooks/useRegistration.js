import { useState } from "react";
import { Post } from "../../../services/httpMethods";

const useRegistration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageResponse, setMessageResponse] = useState(null);
  const [isCloseModal, setCloseModal] = useState(true);

  const handleRegister = async () => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword
    ) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Veuillez saisir une adresse e-mail valide.");
      return;
    }

    try {
      setLoading(true);
      await Post(
        "auth/register",
        { firstName, lastName, email, password }
      );
      setLoading(false);
      setError(false);
      setCloseModal(false);
      setMessageResponse(`✅ Un email de confirmation vient d'être envoyé à : ${email} !`);
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleRegister();
    }
  };
  const handleCloseModal = () => {setCloseModal(true); };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    error,
    handleRegister,
    handleKeyPress,
    loading,
    messageResponse,
    isCloseModal,
    handleCloseModal
  };
};

export default useRegistration;
