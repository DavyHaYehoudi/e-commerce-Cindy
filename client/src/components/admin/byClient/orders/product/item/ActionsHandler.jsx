import * as actions from "../../../../../../constants/productActions";
import { useDispatch } from "react-redux";
import { updateActionContent } from "../../../../../../features/admin/productActionsSlice";
import { generateRandomCode } from "../../../../../../helpers/creditCode";

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

  // ******************************** START CONFIRMATION D'ANNULATION ********************************
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
  // Confirmation d'une annulation de champ
  const handleConfirmation = () => {
    if (confirmAction === actions.CREDIT) {
      setProductActions((prevState) => ({
        ...prevState,
        isAddCredit: false,
        creditContent: { amount: null, dateExpire: null, code: null },
      }));
      setConfirmation((prevState) => ({
        ...prevState,
        isConfirmationVisible: false,
      }));
      return dispatch(
        updateActionContent({
          clientId,
          productId,
          orderId,
          updatedProperty: "credit",
          productActionContent: { amount: null, dateExpire: null, code: null },
        })
      );
    }
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
  // Infirmer l'annulation
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

  // ******************************** END CONFIRMATION D'ANNULATION ********************************

  // ******************************** START GESTION DE L' AVOIR ********************************
  // Champ du montant de l'avoir
  const handleChangeInputCreditAmount = (e) => {
    setProductActions((prevState) => ({
      ...prevState,
      creditContent: { ...prevState.creditContent, amount: e.target.value },
    }));
  };
  // Champ pour la date de validite de l'avoir
  const handleChangeInputDate = (e) => {
    setProductActions((prevState) => ({
      ...prevState,
      creditContent: {
        ...prevState.creditContent,
        dateExpire: e.target.value,
      },
    }));
  };
  const handleButtonCreditAction = (e, action, isValidate) => {
    e.stopPropagation();

    const { amount, dateExpire } = productActions.creditContent;

    const selectedDate = new Date(dateExpire);
    const currentDate = new Date();
    const validityDate = selectedDate > currentDate;

    if (!isValidate) {
      setProductActions((prevState) => ({
        ...prevState,
        isAddCredit: false,
        creditContent: { amount: null, dateExpire: null, code: null },
      }));
    } else if (amount && dateExpire && validityDate && amount.trim() !== "") {
      const code = generateRandomCode()
      const productActionContent = isValidate
        ? {
            amount: productActions.creditContent.amount,
            dateExpire: productActions.creditContent?.dateExpire,
            code,
          }
        : "";
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
        isAddCredit: false,
      }));
    }
  };
  // ******************************** END GESTION DE L' AVOIR ********************************

  // ******************************** START ECHANGE - REMBOURSEMENT ********************************
  const handleChangeInputQuantity = (e, action) => {
    const propertyMap = {
      [actions.EXCHANGE]: "exchangeContent",
      [actions.REFUND]: "refundContent",
    };

    const contentKey = propertyMap[action];
    if (!contentKey) {
      console.log("Error in handleChangeInputQuantity");
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

  // ******************************** END ECHANGE - REMBOURSEMENT ********************************
  // ******************************** START BOUTONS VALIDER / ANNULER ********************************
  // Bouton valider
  const handleConfirmEntry = (e, action) => {
    if (action === actions.CREDIT) {
      return handleButtonCreditAction(e, action, true);
    }
    handleButtonAction(e, action, true);
  };

  // Bouton annuler
  const handleCancelEntry = (e, action) => {
    if (action === actions.CREDIT) {
      return handleButtonCreditAction(e, action, false);
    }
    handleButtonAction(e, action, false);
  };
  // ******************************** END BOUTONS VALIDER / ANNULER ********************************
  // ******************************** START NOTES ********************************
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
  // ******************************** END NOTES ********************************
  return {
    handleConfirmation,
    handleCancel,
    handleChangeInputQuantity,
    handleChangeInputDate,
    handleChangeInputCreditAmount,
    handleButtonAction,
    handleConfirmEntry,
    handleCancelEntry,
    handleChangeNoteValue,
  };
};

export default ActionsHandler;
