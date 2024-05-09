import { toast } from "react-toastify";

export const handleFetchError = (error) => {
  const errorDetails = JSON.parse(error.message);
  console.log("errorDetails:", errorDetails);
  const { status, message, route } = errorDetails;

  if (route.includes("auth/")) {
   return toast.error(message)
  }
  if (error.message.includes("Error 404")) {
    toast.error("Ressource non trouvée 🧐 ");
  }
  if (error.message.includes("Error 500")) {
    toast.error("Erreur de réseau ou du serveur 🚫 ");
  }
};
