import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useUnauthorizedRedirect from "../../services/errors/useUnauthorizedRedirect";
import {
  initWishlist,
  toggleFavoriteVisitor,
} from "../../features/visitUser/visitUserSlice";
import { Patch } from "../../services/httpMethods";
import { toggleFavorite } from "../../features/accountClient/customerSlice";
import useStoreInfo from "./useStoreInfo";

const useFavorite = (productId, materialId) => {
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const handleUnauthorized = useUnauthorizedRedirect();
  const { clientId, wishlistClient, isLiked } = useStoreInfo({
    productsId: productId,
    material: materialId,
  });

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
  const handleClickHeart = async () => {
    setClicked(true);
    await handleLike();
    setTimeout(() => setClicked(false), 2000);
  };

  return { isLiked, handleClickHeart, clicked };
};

export default useFavorite;
