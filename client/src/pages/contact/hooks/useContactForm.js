import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import useAuthWrappers from "../../../useAuthWrappers";
import useFetchData from "../../../useFetchData";

const useContactForm = () => {
  const [successForm, setSuccessForm] = useState({
    success: false,
    failed: false,
  });
  const [loading, setLoading] = useState(false);
  const { role: getRole, clientId: getClientId } = useAuthWrappers();
  const role = getRole();
  const clientId = getClientId();
  useFetchData({ role, clientId });

  const form = useRef();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    scrollToTop();
  }, []);

  const publicKey = process.env.REACT_APP_FORMULAIRE_PUBLIC_API_KEY;
  const template_id = process.env.REACT_APP_FORMULAIRE_TEMPLATE_KEY;
  const service_id = process.env.REACT_APP_FORMULAIRE_SERVICE_KEY;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm(service_id, template_id, form.current, { publicKey })
      .then((res) => {
        setSuccessForm({ success: true, failed: false });
        setLoading(false);
      })
      .catch((error) => {
        console.log("Erreur dans l'envoi de mail formulaire contact :", error);
        setSuccessForm({ success: false, failed: true });
        setLoading(false);
      });
  };

  return {
    form,
    successForm,
    loading,
    handleSubmit,
  };
};

export default useContactForm;
