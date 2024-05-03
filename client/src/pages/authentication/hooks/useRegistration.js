import { useState } from "react";
import { toast } from "react-toastify";

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

  const handleRegister = async () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !confirmPassword) {
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
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const url = `${baseUrl}/${"auth/register"}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setLoading(false);
        setError(false)
        setMessageResponse(`Un email de confirmation vient d'être envoyé à l'adresse mail
        indiquée 📩 !`);
      } else if (data.messageError) {
        toast.error(`${data.messageError}`);
      } else {
        toast.error("Une erreur est survenue avec les informations fournies.");
        throw new Error("Erreur lors de l'inscription.");
      }
    } catch (error) {
      console.error("error:", error);
      toast.error("Une erreur est survenue avec les informations fournies.");
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
  };
};

export default useRegistration;
