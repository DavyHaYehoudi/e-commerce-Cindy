import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useLogin from "./hooks/useLogin";

const Login = () => {
  const {
    email,
    password,
    showPassword,
    forgotPassword,
    handleLogin,
    togglePasswordVisibility,
    handleChangeEmail,
    handleChangePassword,
  } = useLogin();

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
              onChange={handleChangeEmail}
            />

            <label>
              <span>Mot de passe * :</span>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  required
                  aria-required="true"
                  onChange={handleChangePassword}
                />
                <div
                  className="password-icon-container"
                  aria-label="Montrer le mot de passe"
                >
                  {showPassword ? (
                    <AiOutlineEye
                      className="password-icon"
                      onClick={togglePasswordVisibility}
                      aria-hidden="true"
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="password-icon"
                      onClick={togglePasswordVisibility}
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
      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default Login;
