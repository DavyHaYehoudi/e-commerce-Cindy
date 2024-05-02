import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const VerifyEmailRegister = () => {
  const { token } = useParams();
  //   const [verificationStatus, setVerificationStatus] = useState("verified");
  const [verificationStatus, setVerificationStatus] = useState("pending");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const verifyEmail = async (token) => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const url = `${baseUrl}/${"auth/verify-email"}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error("La validation de l'e-mail a échoué.");
      }
      const data = await response.json();
      setEmail(data?.email);
    } catch (error) {
      throw new Error("Erreur lors de la validation de l'e-mail :", error);
    }
  };

  useEffect(() => {
    const verifyEmailToken = async () => {
      try {
        // Vérifier si la vérification est déjà en cours
        if (verificationStatus !== "pending") {
          return;
        }

        await verifyEmail(token);
        setVerificationStatus("verified");
      } catch (error) {
        console.error("Erreur lors de la validation de l'e-mail :", error);
        setVerificationStatus("failed");
      }
    };

    verifyEmailToken();
  }, [token, verificationStatus, navigate]);

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
