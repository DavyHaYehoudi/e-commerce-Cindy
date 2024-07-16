import { useState } from "react";
import { useDispatch } from "react-redux";
import useStoreInfo from "./useStoreInfo";
import useUnauthorizedRedirect from "../../services/errors/useUnauthorizedRedirect";
import { Patch } from "../../services/httpMethods";
import { changeQuantityProductToCart } from "../../features/accountClient/customerSlice";
import { changeQuantityProductToCartVisitor } from "../../features/visitUser/visitUserSlice";
import { showCartAccess } from "../../features/admin/productSlice";
import useAmountCart from "../../pages/shoppingCart/hooks/useAmountCart";

const useQuantitySelectProduct = (productId, materialId) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { clientId, cartStore, quantity, stockMaxProduct } = useStoreInfo({
    productsId: productId,
    material: materialId,
  });
  const handleUnauthorized = useUnauthorizedRedirect();
  const { fetchTotalAmount } = useAmountCart();

  const handleChangeValue = async (newQuantity) => {
    setLoading(true);
    dispatch(showCartAccess(true));
    const quantitySelected =
      newQuantity <= stockMaxProduct ? newQuantity : stockMaxProduct;

    const cartUpdated = cartStore.map((product) => {
      if (
        product?.productsId === productId &&
        product?.material === materialId
      ) {
        return { ...product, quantity: quantitySelected || 1 };
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
          quantity: quantitySelected || 1,
        })
      );
      fetchTotalAmount({ params: {} });
    } else {
      setLoading(true);
      dispatch(
        changeQuantityProductToCartVisitor({
          productId,
          materialId,
          quantity: quantitySelected,
        })
      );
      localStorage.setItem("cartProducts", JSON.stringify(cartUpdated));
      setLoading(false);
    }
  };

  return { loading, quantity, handleChangeValue, stockMaxProduct };
};

export default useQuantitySelectProduct;
