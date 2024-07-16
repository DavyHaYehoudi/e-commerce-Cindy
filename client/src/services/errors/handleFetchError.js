import { toast } from "react-toastify";

export const handleFetchError = (error) => {
  let errorDetails;
  try {
    errorDetails = JSON.parse(error.message);
  } catch (e) {
    toast.error("Erreur inattendue : " + error.message);
    return;
  }

  // console.log("errorDetails:", errorDetails);
  // const errorDetails = JSON.parse(error.message);
  const { status, message, route } = errorDetails;

  if (
    route.includes("auth/") ||
    route.includes("verify-code") ||
    route.includes("order-amount")
  ) {
    // console.log('dans route includes');
    return toast.error(message);
  }
  if (status === 400) {
    toast.error("Informations fournies non valides 🚫 ");
  }
  if (status === 404) {
    toast.error("Ressource non trouvée 🧐 ");
  }
  if (status === 409) {
    toast.error("Déjà enregistré, veuillez modifier 🔀 ");
  }
  if (status === 500) {
    toast.error("Erreur de réseau  🌐  ou du serveur 🛠️ ");
  }
};
