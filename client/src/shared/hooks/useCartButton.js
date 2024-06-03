import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuthWrappers from "../../useAuthWrappers";
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

const useCartButton = (productsId, material, quantity = 1) => {
  const cartStoreClient = useSelector(
    (state) => state?.customer?.data?.client?.cart
  )||[];
  const cartStoreVisitor = useSelector((state) => state?.visitUser?.cart)||[];
  const { clientId: getClientId } = useAuthWrappers();
  const clientId = getClientId();
  const dispatch = useDispatch();
  const handleUnauthorized = useUnauthorizedRedirect();
  const addDate = new Date().toISOString();
  const productCart = { productsId, material, quantity, addDate };
  const cartStore = clientId ? cartStoreClient : cartStoreVisitor;
  const isProductInCart = cartStore.find(
    (product) =>
      product.productsId === productsId && product?.material === material
  );

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
