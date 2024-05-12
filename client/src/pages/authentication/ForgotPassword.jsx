import React from "react";
import { Link } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";
import useForgotPassword from "./hooks/useForgotPassword";
import { ToastContainer } from "react-toastify";

const ForgotPassword = () => {
  const {
    email,
    setEmail,
    resetSent,
    error,
    loading,
    handleResetPassword,
    handleKeyPress,
  } = useForgotPassword();

  return (
    <div className="authentication forgot-password-container">
      {loading ? (
        <div className="loader">
          <MoonLoader color="var(--dark)" />
          <p>Veuillez patienter...</p>
        </div>
      ) : (
        <>
          {!resetSent && <h2>Mot de passe oublié</h2>}
          <form>
            {!resetSent && (
              <>
                <label>Email * :</label>
                <input
                  type="email"
                  value={email}
                  autoFocus
                  required
                  aria-required="true"
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyPress}
                />

                <button
                  className="btn"
                  type="button"
                  onClick={handleResetPassword}
                >
                  Envoyer l'email de récupération
                </button>
                <Link to="/account/login" style={{ color: "var(--primary)" }}>
                  Retour à la page de connexion
                </Link>
              </>
            )}

            {resetSent && (
              <>
                <p>✅</p>
                <p>
                  📩 Un email de récupération a été envoyé à l'adresse{" "}
                  <b>
                    <i>{email}</i>{" "}
                  </b>{" "}
                  .<br />
                  ▶️ Veuillez suivre les instructions pour réinitialiser votre
                  mot de passe.
                </p>
                <Link to="/account/login">
                  <b>
                    <span className="underline">
                      Retour à la page de connexion
                    </span>
                  </b>{" "}
                </Link>
              </>
            )}

            {error && <p className="error-message">{error}</p>}
          </form>
        </>
      )}
      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default ForgotPassword;
