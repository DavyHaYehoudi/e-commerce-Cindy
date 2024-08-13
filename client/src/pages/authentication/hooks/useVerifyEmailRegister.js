import { useState, useEffect } from "react";
import { Patch, Post } from "../../../services/httpMethods";
import useUnauthorizedRedirect from "../../../services/errors/useUnauthorizedRedirect";

const useVerifyEmailRegister = (token) => {
  const [verificationStatus, setVerificationStatus] = useState("pending");
  const [email, setEmail] = useState("");
  const [clientId, setClientId] = useState(null);
  const handleUnauthorized = useUnauthorizedRedirect();

  const verifyEmail = async (token) => {
    try {
      const data = await Post("auth/verify-email", { token });
      setEmail(data?.email);
      setClientId(data?.clientId);
      setVerificationStatus("verified");
      try {
        const cartProductsString = localStorage.getItem("cartProducts");
        const likedProductsString = localStorage.getItem("likedProducts");
        const cartProducts = cartProductsString
          ? JSON.parse(cartProductsString)
          : [];
        const likedProducts = likedProductsString
          ? JSON.parse(likedProductsString)
          : [];
        const formatData = { cart: cartProducts, wishlist: likedProducts };
        await Patch(
          `clients/${clientId}`,
          formatData,
          null,
          handleUnauthorized
        );
      } catch (error) {
        console.log(
          "Erreur lors de la récupération du clientId (verifyEmail) :",
          error
        );
      }
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
