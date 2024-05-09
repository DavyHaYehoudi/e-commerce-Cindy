import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useVerifyEmailRegister from "./hooks/useVerifyEmailRegister";

const VerifyEmailRegister = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const { verificationStatus, email } = useVerifyEmailRegister(token);

  return (
    <div className="authentication verify-email-register">
      {verificationStatus === "pending" && <p>Vérification en cours...</p>}
      {verificationStatus === "verified" && (
        <div className="modal">
          <div className="modal-content">
            <p>
              ✅ Votre e-mail est confirmé et votre compte est à présent validé 😃 !<br />
              <button
                className="login-button"
                onClick={() => navigate("/account/login", { state: email })}
              >
                SE CONNECTER
              </button>
            </p>
          </div>
        </div>
      )}
      {verificationStatus === "failed" && (
        <div className="failed-verification">
          <p>La vérification de votre e-mail a échoué. 🙁</p>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailRegister;
