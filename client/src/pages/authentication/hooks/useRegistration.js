import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
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
        window.alert(
          "Compte utilisateur créé avec succès 😃 ! Vous allez être redirigé vers la page de connexion."
        );
        navigate("/account/login");
      } else if (data.messageError) {
        window.alert(
          `${data.messageError}. Veuillez choisir une autre adresse email.`
        );
      } else {
        toast.error("Une erreur est survenue avec les informations fournies.");
        throw new Error("Erreur lors de l'inscription.");
      }
    } catch (error) {
      console.error("error:", error);
      toast.error("Une erreur est survenue avec les informations fournies.");
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
  };
};

export default useRegistration;
