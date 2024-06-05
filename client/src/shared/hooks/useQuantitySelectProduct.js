import { useState } from "react";
import { useDispatch } from "react-redux";
import useStoreInfo from "./useStoreInfo";
import useUnauthorizedRedirect from "../../services/errors/useUnauthorizedRedirect";
import { Patch } from "../../services/httpMethods";
import { changeQuantityProductToCart } from "../../features/accountClient/customerSlice";
import { changeQuantityProductToCartVisitor } from "../../features/visitUser/visitUserSlice";

const useQuantitySelectProduct = (productId, materialId) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { clientId, cartStore, quantity } = useStoreInfo({
    productsId: productId,
    material: materialId,
  });
  const handleUnauthorized = useUnauthorizedRedirect();

  const handleChangeValue = async (newQuantity) => {
    if (newQuantity < 1) {
      return;
    }
    setLoading(true);
    const cartUpdated = cartStore.map((product) => {
      if (
        product?.productsId === productId &&
        product?.material === materialId
      ) {
        return { ...product, quantity: newQuantity };
      } else {
        return product;
      }
    });
    const formatData = { cart: cartUpdated };
    if (clientId) {
      try {
        await Patch(
          `clients/${clientId}`,
          formatData,
          null,
          handleUnauthorized
        );
      } catch (error) {
        console.log(
          "Erreur dans handleIncrement useQuantitySelectProduct :",
          error
        );
      } finally {
        setLoading(false);
      }
      dispatch(
        changeQuantityProductToCart({
          productId,
          materialId,
          quantity: newQuantity,
        })
      );
    } else {
        setLoading(true);
      dispatch(
        changeQuantityProductToCartVisitor({
          productId,
          materialId,
          quantity: newQuantity,
        })
      );
      localStorage.setItem("cartProducts", JSON.stringify(cartUpdated));
      setLoading(false)
    }
  };

  return { loading, quantity, handleChangeValue };
};

export default useQuantitySelectProduct;
