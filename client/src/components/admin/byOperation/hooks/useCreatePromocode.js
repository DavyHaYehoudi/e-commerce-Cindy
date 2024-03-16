import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { customFetch } from "../../../../services/customFetch";
import { createPromocode } from "../../../../features/admin/promocodeSlice";

const useCreatePromocode = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const createPromoCode = useCallback(
    async (formatData) => {
      try {
        setLoading(true);
        const creatingPromocode = await customFetch("promocodes", {
          method: "POST",
          body: JSON.stringify(formatData),
        });
        if (creatingPromocode) {
          dispatch(createPromocode(formatData));
          toast.success("Le code promo a bien été ajouté !");
        }
      } catch (error) {
        if (error.message.includes("Status: 400")) {
          toast.error(
            "Une erreur est survenue avec les informations fournies."
          );
        }
        if (error.message.includes("Status: 500")) {
          toast.error("Une erreur est survenue avec le réseau ou le serveur.");
        }
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );
  return { createPromoCode, loading, error };
};

export default useCreatePromocode;
