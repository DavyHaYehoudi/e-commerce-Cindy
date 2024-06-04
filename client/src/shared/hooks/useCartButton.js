import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useUnauthorizedRedirect from "../../services/errors/useUnauthorizedRedirect";
import {
  addOneProductToCartVisitor,
  initCart,
  removeOneProductToCartVisitor,
} from "../../features/visitUser/visitUserSlice";
import { Patch } from "../../services/httpMethods";
import {
  addOneProductToCart,
  removeOneProductToCart,
} from "../../features/accountClient/customerSlice";
import useStoreInfo from "./useStoreInfo";

const useCartButton = (productsId, material, quantity = 1) => {
  const { clientId, cartStore, isProductInCart } = useStoreInfo({
    productsId,
    material,
  });
  const dispatch = useDispatch();
  const handleUnauthorized = useUnauthorizedRedirect();
  const addDate = new Date().toISOString();
  const productCart = { productsId, material, quantity, addDate };

  useEffect(() => {
    const cartProductsString = localStorage.getItem("cartProducts");
    const cartProducts = cartProductsString
      ? JSON.parse(cartProductsString)
      : [];
    dispatch(initCart(cartProducts));
  }, [dispatch]);

  const handleAddToCart = async () => {
    if (clientId) {
      let cartUpdated = [...cartStore, productCart];
      const formatData = { cart: cartUpdated };
      try {
        await Patch(
          `clients/${clientId}`,
          formatData,
          null,
          handleUnauthorized
        );
      } catch (error) {
        console.log("Erreur dans handleAddToCart AddToCartButton :", error);
      }
      dispatch(addOneProductToCart(productCart));
    } else {
      dispatch(addOneProductToCartVisitor(productCart));
      const cartProductsString = localStorage.getItem("cartProducts");
      let cartProducts = cartProductsString
        ? JSON.parse(cartProductsString)
        : [];
      cartProducts.push(productCart);
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    }
  };

  const handleRemoveToCart = async () => {
    if (clientId) {
      const cartUpdated = cartStore.filter((item) => {
        if (material) {
          return !(
            item.productsId === productsId && item.material === material
          );
        } else {
          return item.productsId !== productsId;
        }
      });
      const formatData = { cart: cartUpdated };
      try {
        await Patch(
          `clients/${clientId}`,
          formatData,
          null,
          handleUnauthorized
        );
      } catch (error) {
        console.log("Erreur dans handleRemoveToCart AddToCartButton :", error);
      }
      dispatch(removeOneProductToCart(productCart));
    } else {
      dispatch(removeOneProductToCartVisitor(productCart));
      const cartProductsString = localStorage.getItem("cartProducts");
      let cartProducts = cartProductsString
        ? JSON.parse(cartProductsString)
        : [];
      const existingProductIndex = cartProducts.findIndex(
        (product) =>
          product.productsId === productsId && product.material === material
      );
      if (existingProductIndex >= 0) {
        cartProducts.splice(existingProductIndex, 1);
        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
      }
    }
  };

  return { handleAddToCart, handleRemoveToCart, isProductInCart };
};

export default useCartButton;
