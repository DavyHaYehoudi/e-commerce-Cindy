import React, { useState } from "react";
import { Link } from "react-router-dom"; // Assure-toi que tu as bien react-router-dom installé

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleResetPassword = () => {
    // Logique pour envoyer un email de réinitialisation (à implémenter)
    console.log("Request password reset for:", email);
    setResetSent(true);
  };

  return (
    <div className="forgot-password-container">
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
              onChange={(e) => setEmail(e.target.value)}
            />

            <button  className="btn" type="button" onClick={handleResetPassword}>
              Envoyer l'email de récupération
            </button>
            <Link to="/account/login" style={{color:"blue"}} >Retour à la page de connexion</Link>
          </>
        )}

        {resetSent && (
          <>
            <p>
              Un email de récupération a été envoyé à l'adresse {email}. Veuillez
              suivre les instructions pour réinitialiser votre mot de passe.
            </p>
            <Link to="/account/login"><b><u>Retour à la page de connexion</u></b> </Link>
          </>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
