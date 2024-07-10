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
import { showCartAccess } from "../../features/admin/productSlice";
import useAmountCart from "../../pages/shoppingCart/hooks/useAmountCart";

const useCartButton = (productsId, material) => {
  const { clientId, cartStore, isProductInCart, quantity } = useStoreInfo({
    productsId,
    material,
  });
  const dispatch = useDispatch();
  const handleUnauthorized = useUnauthorizedRedirect();
  const { fetchTotalAmount } = useAmountCart();
  const addDate = new Date().toISOString();
  const productCart = { productsId, material, addDate, quantity };

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
        dispatch(addOneProductToCart(productCart));
        dispatch(showCartAccess(true))
      } catch (error) { 
        console.log("Erreur dans handleAddToCart AddToCartButton :", error);
      }
    } else {
      dispatch(addOneProductToCartVisitor(productCart));
      dispatch(showCartAccess(true))
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
      dispatch(showCartAccess(true))
      fetchTotalAmount({})
    } else {
      dispatch(removeOneProductToCartVisitor(productCart));
      dispatch(showCartAccess(true))
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
  return { handleRemoveToCart, isProductInCart, handleAddToCart };
};

export default useCartButton;
