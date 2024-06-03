import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuthWrappers from "../../useAuthWrappers";
import useUnauthorizedRedirect from "../../services/errors/useUnauthorizedRedirect";
import {
  initWishlist,
  toggleFavoriteVisitor,
} from "../../features/visitUser/visitUserSlice";
import { Patch } from "../../services/httpMethods";
import { toggleFavorite } from "../../features/accountClient/customerSlice";

const findIsLiked = (wishlist, productId, materialId) => {
  return wishlist.find((product) => {
    if (materialId) {
      return (
        product?.productsId === productId && product?.material === materialId
      );
    } else {
      return product?.productsId === productId;
    }
  });
};

const useFavorite = (productId, materialId) => {
  const dispatch = useDispatch();
  const { clientId: getClientId } = useAuthWrappers();
  const clientId = getClientId();
  const handleUnauthorized = useUnauthorizedRedirect();

  const wishlistClient =
    useSelector((state) => state?.customer?.data?.client?.wishlist) || [];
  const wishlistVisitor = useSelector(
    (state) => state?.visitUser?.wishlist || []
  );
  const wishlist = clientId ? wishlistClient : wishlistVisitor;
  const isLiked = findIsLiked(wishlist, productId, materialId);

  useEffect(() => {
    const likedProductsString = localStorage.getItem("likedProducts");
    const likedProducts = likedProductsString
      ? JSON.parse(likedProductsString)
      : [];
    dispatch(initWishlist(likedProducts));
  }, [dispatch]);

  const handleLike = async () => {
    const addDate = new Date().toISOString();
    const productLiked = {
      productsId: productId,
      material: materialId,
      addDate,
    };

    if (clientId) {
      let wishlistUpdated;
      const existingProductIndex = wishlistClient.findIndex((item) => {
        if (materialId) {
          return item.productsId === productId && item.material === materialId;
        } else {
          return item.productsId === productId;
        }
      });

      if (existingProductIndex >= 0) {
        wishlistUpdated = wishlistClient.filter((item) => {
          if (materialId) {
            return !(
              item.productsId === productId && item.material === materialId
            );
          } else {
            return item.productsId !== productId;
          }
        });
      } else {
        wishlistUpdated = [...wishlistClient, productLiked];
      }

      const formatData = { wishlist: wishlistUpdated };
      try {
        await Patch(
          `clients/${clientId}`,
          formatData,
          null,
          handleUnauthorized
        );
        dispatch(toggleFavorite(productLiked));
      } catch (error) {
        console.log("Une erreur dans handleLike :", error);
      }
    } else {
      dispatch(toggleFavoriteVisitor(productLiked));
      const likedProductsString = localStorage.getItem("likedProducts");
      let likedProducts = likedProductsString
        ? JSON.parse(likedProductsString)
        : [];
      const existingIndex = likedProducts.findIndex(
        (product) =>
          product.productsId === productId && product.material === materialId
      );

      if (existingIndex !== -1) {
        likedProducts.splice(existingIndex, 1);
      } else {
        likedProducts.push(productLiked);
      }
      localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
    }
  };

  return { isLiked, handleLike };
};

export default useFavorite;
