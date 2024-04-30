import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { customFetch } from "../services/customFetch";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword] = useState(false);

  const handleLogin = async() => {
    try {
      const response = await customFetch('auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem('token', response.token);

      // Rediriger vers la page suivante ou effectuer d'autres actions nécessaires après la connexion réussie
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
    }
  };

  return (
    <div className="login-container">
      <h2>{forgotPassword ? "Réinitialiser le mot de passe" : "Connexion"}</h2>
      <form>
        {!forgotPassword && (
          <>
            <label>Email * :</label>
            <input
              type="email"
              value={email}
              autoFocus
              required
              aria-required="true"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>
              <span>Mot de passe * :</span>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  required
                  aria-required="true"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="password-icon-container" aria-label="Montrer le mot de passe">
                  {showPassword ? (
                    <AiOutlineEye
                      className="password-icon"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-hidden="true"
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="password-icon"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-hidden="true"
                    />
                  )}
                </div>
              </div>
              <Link to="/account/forgot-password" style={{ color: "blue" }}>
                Mot de passe oublié ?
              </Link>
            </label>

            <button type="button" className="btn" onClick={handleLogin}>
              Se connecter
            </button>
            <div className="link-to-register">
              Vous n'avez pas de compte ?{" "}
              <Link to="/account/register">
                <b>
                  <span className="underline">Inscrivez-vous</span>{" "}
                </b>
              </Link>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
