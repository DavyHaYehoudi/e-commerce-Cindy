import { useDispatch, useSelector } from "react-redux";
import useStoreInfo from "../../../shared/hooks/useStoreInfo";
import useUnauthorizedRedirect from "../../../services/errors/useUnauthorizedRedirect";
import {
  resetAdvantages,
  showCartAccess,
  showWishlistAccess,
} from "../../../features/admin/productSlice";
import { Patch } from "../../../services/httpMethods";
import { clearCart } from "../../../features/accountClient/customerSlice";
import { clearCartVisitor } from "../../../features/visitUser/visitUserSlice";

const useCartOffcanvas = () => {
  const { clientId, cartStore, cartTotalAmount } = useStoreInfo({
    productsId: "",
    material: "",
  });
  const isCartContent = cartStore.length > 0;
  const dispatch = useDispatch();
  const handleUnauthorized = useUnauthorizedRedirect();
  const show = useSelector((state) => state?.product?.cartAccess);

  const handleCloseCartAccess = () => {
    dispatch(showCartAccess(false));
  };
  const handleCloseWishlistModal = () => {
    dispatch(showWishlistAccess(false));
  };

  const handleClearCart = async () => {
    dispatch(resetAdvantages());
    if (clientId) {
      let cart = [];
      const formatData = { cart };
      try {
        await Patch(
          `clients/${clientId}`,
          formatData,
          null,
          handleUnauthorized
        );
        dispatch(clearCart());
      } catch (error) {
        console.log("Erreur dans handleClearCart CartOffcanvas :", error);
      }
    } else {
      dispatch(clearCartVisitor());
      localStorage.removeItem("cartProducts");
    }
  };

  return {
    show,
    cartStore,
    cartTotalAmount,
    isCartContent,
    clientId,
    handleCloseCartAccess,
    handleClearCart,
    handleCloseWishlistModal,
  };
};

export default useCartOffcanvas;
