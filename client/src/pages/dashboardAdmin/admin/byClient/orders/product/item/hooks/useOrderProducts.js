import { useState } from "react";
import { useSelector } from "react-redux";
import { getCreditsInfo } from "../../../../../../../../selectors/credit";
import { getProductsInfo } from "../../../../../../../../selectors/orderProducts";

const useOrderProducts = (orderProducts, orderId) => {
  const { productsId, material, quantity } = orderProducts || {};
  const ordersStore = useSelector((state) => state?.orders?.data);
  const orderProductsStore = useSelector((state) => state?.orderProducts?.data);
  const productStore = useSelector((state) => state?.product?.data);
  const { amount } = useSelector((state) =>
    getCreditsInfo(state, { productsId: orderProducts._id })
  );

  const {
    orderProductsInfo,
    isTagProductExisted,
    articleNumber,
    getOneOrderProducts,
  } = getProductsInfo(
    ordersStore,
    orderProductsStore,
    orderId,
    orderProducts._id
  );

  const [interaction, setInteraction] = useState({
    isActionsOpen: false,
    activeLi: null,
  });
  const [confirmation, setConfirmation] = useState({
    isConfirmationVisible: false,
    confirmAction: null,
  });
  const [entryError, setEntryError] = useState(false);
  const [orderProductsActions, setProductActions] = useState({
    isAddNote: orderProductsInfo?.note,
    isAddCredit: false,
    isAddRefund: false,
    isAddExchange: false,
    noteContent: orderProductsInfo?.note,
    creditContent: orderProductsInfo?.credit,
    refundContent: null,
    exchangeContent: null,
  });

  const toggleActions = () => {
    setInteraction((prevState) => ({
      ...prevState,
      isActionsOpen: !prevState.isActionsOpen,
    }));
  };

  return {
    productsId,
    material,
    quantity,
    ordersStore,
    orderProductsStore,
    productStore,
    amount,
    orderProductsInfo,
    isTagProductExisted,
    articleNumber,
    getOneOrderProducts,
    interaction,
    setInteraction,
    confirmation,
    setConfirmation,
    entryError,
    setEntryError,
    orderProductsActions,
    setProductActions,
    toggleActions,
  };
};

export default useOrderProducts;
