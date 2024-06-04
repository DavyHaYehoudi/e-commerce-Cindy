import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useStoreInfo from "../../../shared/hooks/useStoreInfo";
import useUnauthorizedRedirect from "../../../services/errors/useUnauthorizedRedirect";
import { Patch } from "../../../services/httpMethods";
import {
  addWishlistToCart,
  clearWishlist,
} from "../../../features/accountClient/customerSlice";
import {
  addWishlistToCartVisitor,
  clearWishlistVisitor,
} from "../../../features/visitUser/visitUserSlice";

const useWishlistActions = () => {
  const dispatch = useDispatch();
  const { clientId, wishlist, cartStore } = useStoreInfo({
    productsId: "",
    material: "",
  });
  const handleUnauthorized = useUnauthorizedRedirect();

  const handleAddAllToCart = async () => {
    if (wishlist && wishlist.length > 0) {
      if (clientId) {
        const formatData = { cart: [...cartStore, ...wishlist] };
        try {
          await Patch(
            `clients/${clientId}`,
            formatData,
            null,
            handleUnauthorized
          );
        } catch (error) {
          console.log(
            "Erreur dans handleAddAllToCart WishlistModalActions :",
            error
          );
        }
        dispatch(addWishlistToCart({ wishlist }));
      } else {
        dispatch(addWishlistToCartVisitor({ wishlist }));
        const cartLocalStorage = JSON.parse(
          localStorage.getItem("cartProducts") || "[]"
        );
        let cartProductsUpdated = [...cartLocalStorage, ...wishlist];
        localStorage.setItem(
          "cartProducts",
          JSON.stringify(cartProductsUpdated)
        );
      }
      toast.success("Tous les produits ont été ajoutés au panier 👍 !");
    }
  };

  const handleClearWishlist = async () => {
    if (clientId) {
      let wishlist = [];
      const formatData = { wishlist };
      try {
        await Patch(
          `clients/${clientId}`,
          formatData,
          null,
          handleUnauthorized
        );
      } catch (error) {
        console.log(
          "Erreur dans handleClearWishlist WishlistModalActions :",
          error
        );
      }
      dispatch(clearWishlist());
    } else {
      dispatch(clearWishlistVisitor());
      localStorage.removeItem("likedProducts");
    }
  };

  return { handleAddAllToCart, handleClearWishlist };
};

export default useWishlistActions;
