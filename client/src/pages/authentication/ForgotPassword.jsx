import React, { useState } from "react";
import { Link } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    if (!validateEmail(email)) {
      setError("Veuillez saisir une adresse e-mail valide.");
      return;
    }

    const baseUrl = process.env.REACT_APP_BASE_URL;
    const url = `${baseUrl}/${"auth/request-password-reset"}`;
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setLoading(false);
        setResetSent(true);
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la demande de réinitialisation du mot de passe :",
        error
      );
      setError(
        "Erreur serveur lors de la demande de réinitialisation du mot de passe."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authentication forgot-password-container">
      {loading ? (
        <div className="loader">
          <MoonLoader color="var(--dark)" />
          <p>Veuillez patienter...</p>
        </div>
      ) : (
        <>
          <h2>Mot de passe oublié</h2>
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
                />

                <button
                  className="btn"
                  type="button"
                  onClick={handleResetPassword}
                >
                  Envoyer l'email de récupération
                </button>
                <Link to="/account/login" style={{ color: "blue" }}>
                  Retour à la page de connexion
                </Link>
              </>
            )}

            {resetSent && (
              <>
                <p>
                  Un email de récupération a été envoyé à l'adresse {email}.
                  Veuillez suivre les instructions pour réinitialiser votre mot
                  de passe.
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
    </div>
  );
};

export default ForgotPassword;
