import { useDispatch, useSelector } from "react-redux";
import useUnauthorizedRedirect from "../../../services/errors/useUnauthorizedRedirect";
import useAuthWrappers from "../../../useAuthWrappers";
import { Patch } from "../../../services/httpMethods";
import { toggleFavorite } from "../../../features/accountClient/customerSlice";
import { toggleFavoriteVisitor } from "../../../features/visitUser/visitUserSlice";

const useWishlistProduct = (product) => {
  const wishlistClient =
    useSelector((state) => state?.customer?.data?.client?.wishlist) || [];
  const dispatch = useDispatch();
  const handleUnauthorized = useUnauthorizedRedirect();
  const { clientId: getClientId } = useAuthWrappers();
  const clientId = getClientId();
  const { productsId, material } = product || {};

  const handleClickTrash = async () => {
    if (clientId) {
      let wishlistUpdated;

      wishlistUpdated = wishlistClient.filter((item) => {
        if (material) {
          return !(
            item.productsId === productsId && item.material === material
          );
        } else {
          return item.productsId !== productsId;
        }
      });

      const formatData = { wishlist: wishlistUpdated };

      try {
        await Patch(
          `clients/${clientId}`,
          formatData,
          null,
          handleUnauthorized
        );
      } catch (error) {
        console.log("Erreur dans handleClickTrash wishlistProduct :", error);
      }
      dispatch(toggleFavorite({ productsId, material }));
    } else {
      const productLiked = {
        productsId,
        material,
      };
      dispatch(toggleFavoriteVisitor(productLiked));
      const likedProductsString = localStorage.getItem("likedProducts");
      let likedProducts = likedProductsString
        ? JSON.parse(likedProductsString)
        : [];
      const existingIndex = likedProducts.findIndex(
        (product) =>
          product.productsId === productsId && product.material === material
      );

      likedProducts.splice(existingIndex, 1);
      localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
    }
  };

  return { handleClickTrash };
};

export default useWishlistProduct;
