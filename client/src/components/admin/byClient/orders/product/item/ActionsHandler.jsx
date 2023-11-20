import * as actions from "../../../../../../constants/productActions";
import { useDispatch } from "react-redux";
import { updateActionContent } from "../../../../../../features/admin/productActionsSlice";

const ActionsHandler = ({
  confirmation,
  productActions,
  setProductActions,
  setConfirmation,
  setInteraction,
  clientId,
  productId,
  orderId,
}) => {
  const dispatch = useDispatch();
  const { confirmAction } = confirmation;
  const updateProductActions = (confirmAction) => {
    const dynamicProductActions = {
      ...Object.fromEntries(
        Object.entries(productActions).map(([key, value]) => [
          key,
          key.startsWith("isAdd") ? key === confirmAction : value,
        ])
      ),
    };
    setProductActions((prevState) => ({
      ...prevState,
      ...dynamicProductActions,
    }));
  };

  const handleConfirmation = () => {
    if (confirmAction) {
      dispatch(
        updateActionContent({
          clientId,
          productId,
          orderId,
          updatedProperty: confirmAction,
          productActionContent: null,
        })
      );
      updateProductActions(confirmAction);
      setConfirmation((prevState) => ({
        ...prevState,
        confirmAction: null,
        isConfirmationVisible: false,
      }));
    }
  };

  const handleCancel = () => {
    setConfirmation((prevState) => ({
      ...prevState,
      isConfirmationVisible: false,
      confirmAction: null,
    }));
    setInteraction((prevState) => ({
      ...prevState,
      activeLi: null,
    }));
  };

  const handleChangeInputValue = (e, action) => {
    const propertyMap = {
      [actions.EXCHANGE]: "exchangeContent",
      [actions.REFUND]: "refundContent",
      [actions.CREDIT]: "creditContent",
      [actions.NOTE]: "noteContent",
    };

    const contentKey = propertyMap[action];
    if (!contentKey) {
      console.log("Error in handleChangeInputValue");
      return;
    }
    setProductActions((prevState) => ({
      ...prevState,
      [contentKey]: e.target.value,
    }));
  };
  const handleButtonAction = (e, action, isValidate) => {
    e.stopPropagation();
    const propertyMap = {
      [actions.EXCHANGE]: {
        contentKey: "exchangeContent",
        flagKey: "isAddExchange",
      },
      [actions.REFUND]: { contentKey: "refundContent", flagKey: "isAddRefund" },
      [actions.CREDIT]: { contentKey: "creditContent", flagKey: "isAddCredit" },
      [actions.NOTE]: { contentKey: "noteContent", flagKey: "isAddNote" },
    };

    const { contentKey, flagKey } = propertyMap[action] || {};
    if (!contentKey || !flagKey) return;
    const productActionContent = isValidate
      ? productActions[contentKey] || ""
      : "";
    // Ne permettre une validation de saisie si value non vide
    if (productActions[contentKey].trim() !== "" || !isValidate) {
      const dynamicProperties = isValidate
        ? { [contentKey]: "", [flagKey]: false }
        : { [flagKey]: false, [contentKey]: "" };

      dispatch(
        updateActionContent({
          clientId,
          productId,
          orderId,
          updatedProperty: action,
          productActionContent,
        })
      );

      setProductActions((prevState) => ({
        ...prevState,
        ...dynamicProperties,
      }));
    }
  };

  // Bouton valider
  const handleConfirmEntry = (e, action) => {
    handleButtonAction(e, action, true);
  };

  // Bouton annuler
  const handleCancelEntry = (e, action) => {
    handleButtonAction(e, action, false);
  };
  return {
    handleConfirmation,
    handleCancel,
    handleChangeInputValue,
    handleButtonAction,
    handleConfirmEntry,
    handleCancelEntry,
  };
};

export default ActionsHandler;
