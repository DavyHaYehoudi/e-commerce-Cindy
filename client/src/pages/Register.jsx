import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    // Logique d'inscription (à implémenter)
    console.log("Register with:", email, password);
  };

  return (
    <div className="register-container">
      <h2>Inscription</h2>
      <form>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Mot de passe:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Confirmer le mot de passe:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="button" onClick={handleRegister}>
          S'inscrire
        </button>

        <p>
          Vous avez déjà un compte ?{" "}
          <Link to="/account/login">Connectez-vous ici</Link>.
        </p>
      </form>
    </div>
  );
};

export default Register;
