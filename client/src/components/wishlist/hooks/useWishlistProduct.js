import { useDispatch } from "react-redux";
import useUnauthorizedRedirect from "../../../services/errors/useUnauthorizedRedirect";
import { Patch } from "../../../services/httpMethods";
import { toggleFavorite } from "../../../features/accountClient/customerSlice";
import { toggleFavoriteVisitor } from "../../../features/visitUser/visitUserSlice";
import useStoreInfo from "../../../shared/hooks/useStoreInfo";

const useWishlistProduct = (product) => {
  const dispatch = useDispatch();
  const handleUnauthorized = useUnauthorizedRedirect();
  const { productsId, material } = product || {};
  const { clientId, wishlistClient } = useStoreInfo({ productsId, material });
  
  const handleClickTrash = async () => {
    if (clientId) {
      let wishlistUpdated;

      wishlistUpdated = wishlistClient.filter((item) => {
        if (material) {
          return !(
            item?.productsId === productsId && item?.material === material
          );
        } else {
          return item?.productsId !== productsId;
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
