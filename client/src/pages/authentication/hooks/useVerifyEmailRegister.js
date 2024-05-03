import { useState, useEffect } from "react";

const useVerifyEmailRegister = (token) => {
  const [verificationStatus, setVerificationStatus] = useState("pending");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

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
      setVerificationStatus("verified");
      setError(null)
    } catch (error) {
      setError(error);
      setVerificationStatus("failed");
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
      } catch (error) {
        console.error("Erreur lors de la validation de l'e-mail :", error);
      }
    };

    verifyEmailToken();
  }, [token, verificationStatus]);

  return { verificationStatus, email, error };
};

export default useVerifyEmailRegister;
