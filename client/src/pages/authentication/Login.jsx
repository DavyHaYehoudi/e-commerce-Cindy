import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useLogin from "./hooks/useLogin";
import MoonLoader from "react-spinners/MoonLoader";

const Login = () => {
  const {
    email,
    password,
    showPassword,
    forgotPassword,
    loading,
    error,
    handleLogin,
    togglePasswordVisibility,
    handleChangeEmail,
    handleChangePassword,
    handleKeyPress,
  } = useLogin();

  return (
    <div className="authentication login-container">
      {loading ? (
        <div className="loader">
          <MoonLoader color="var(--dark)" />
          <p>Veuillez patienter...</p>
        </div>
      ) : (
        <>
          <h2>
            {forgotPassword ? "Réinitialiser le mot de passe" : "Connexion"}
          </h2>
          <form>
            {error && <p className="error-message">{error}</p>}
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
                  onKeyDown={handleKeyPress}
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
                      onKeyDown={handleKeyPress}
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
        </>
      )}
      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default Login;
