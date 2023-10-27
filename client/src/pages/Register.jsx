import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    // Logique d'inscription (à implémenter)
    console.log("Register with:", email, password);
  };

  return (
    <div className="register-container">
      <h2>Inscription</h2>
      <form>
        <label>Prénom * :</label>
        <input
          type="text"
          value={firstName}
          required
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label>Nom * :</label>
        <input
          type="text"
          value={lastName}
          required
          onChange={(e) => setLastName(e.target.value)}
        />
        <label>Email * :</label>
        <input
          type="email"
          value={email}
          autoFocus
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>
          <span>Mot de passe * :</span>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="password-icon-container" aria-label="Montrer le mot de passe">
              {showPassword ? (
                <AiOutlineEyeInvisible
                  className="password-icon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <AiOutlineEye
                  className="password-icon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>
        </label>

        <label>
          <span>Confirmer le mot de passe * :</span>
          <div className="password-input">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="password-icon-container" aria-label="Montrer le mot de passe">
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible
                  className="password-icon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              ) : (
                <AiOutlineEye
                  className="password-icon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              )}
            </div>
          </div>
        </label>

        <button className="btn" type="button" onClick={handleRegister}>
          S'inscrire
        </button>

        <p>
          Vous avez déjà un compte ?{" "}
          <Link to="/account/login">
            <b>
              <u>Connectez-vous ici</u>
            </b>{" "}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
