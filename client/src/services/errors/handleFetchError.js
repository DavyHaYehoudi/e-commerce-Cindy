import { toast } from "react-toastify";

export const handleFetchError = (error) => {
  const errorDetails = JSON.parse(error.message);
  console.log("errorDetails:", errorDetails);
  const { status, message, route } = errorDetails;

  if (route.includes("auth/") || route.includes("verify-code")) {
    console.log('dedans');
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
