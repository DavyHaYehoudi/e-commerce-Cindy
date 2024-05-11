import { useState, useEffect } from "react";
import { Post } from "../../../services/httpMethods";

const useVerifyEmailRegister = (token) => {
  const [verificationStatus, setVerificationStatus] = useState("pending");
  const [email, setEmail] = useState("");

  const verifyEmail = async (token) => {
    try {
      const data = await Post("auth/verify-email", { token });
      setEmail(data?.email);
      setVerificationStatus("verified");
    } catch (error) {
      setVerificationStatus("failed");
      console.error(
        "Erreur lors de la validation de l'e-mail (verifyEmail) :",
        error
      );
    }
  };

  useEffect(() => {
    const verifyEmailToken = async () => {
      try {
        await verifyEmail(token);
      } catch (error) {
        console.error( 
          "Erreur lors de la validation de l'e-mail (verifyEmailToken) :",
          error
        );
      }
    };

    verifyEmailToken();
  }, [token]);

  return { verificationStatus, email };
};

export default useVerifyEmailRegister;
