import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { customFetch } from "../../../../services/customFetch";
import { deletePromocode } from "../../../../features/admin/promocodeSlice";

const useDeletePromocode = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const deletePromoCode = useCallback(
    async (id) => {
      try {
        setLoading(true);
        const deletedPromocode = await customFetch(`promocodes/${id}`, {
          method: "DELETE",
        });
        if (deletedPromocode) {
          dispatch(deletePromocode(id));
          toast.success("Le code promo a bien été supprimé !");
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
  return { deletePromoCode, loading, error };
};

export default useDeletePromocode;
