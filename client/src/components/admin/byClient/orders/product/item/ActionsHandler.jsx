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
  // Confirmation avant annulation d'un champ déjà mémorisé
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
  // Simple annulation d'une saisie non encore mémorisée
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
  // Champs des actions de la liste (Remboursement,Echange et Avoir)
  const handleChangeInputValue = (e, action) => {
    const propertyMap = {
      [actions.EXCHANGE]: "exchangeContent",
      [actions.REFUND]: "refundContent",
      [actions.CREDIT]: "creditContent",
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
  // Validation ou annulation pour une simple saisie
  const handleButtonAction = (e, action, isValidate) => {
    e.stopPropagation();
    const propertyMap = {
      [actions.EXCHANGE]: {
        contentKey: "exchangeContent",
        flagKey: "isAddExchange",
      },
      [actions.REFUND]: { contentKey: "refundContent", flagKey: "isAddRefund" },
      [actions.CREDIT]: { contentKey: "creditContent", flagKey: "isAddCredit" },
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

  // Champ des notes
  const handleChangeNoteValue = (e) => {
    dispatch(
      updateActionContent({
        clientId,
        productId,
        orderId,
        updatedProperty: actions.NOTE,
        productActionContent: e.target.value,
      })
    );
  };

  return {
    handleConfirmation,
    handleCancel,
    handleChangeInputValue,
    handleButtonAction,
    handleConfirmEntry,
    handleCancelEntry,
    handleChangeNoteValue,
  };
};

export default ActionsHandler;
