import * as actions from "../../../../../../../../constants/productActions";
import { useDispatch } from "react-redux";
import { updateActionContent } from "../../../../../../../../features/admin/productActionsSlice";
import { generateRandomCode } from "../../../../../../../../helpers/creditCode";

const ActionsHandler = ({
  productActions,
  setProductActions,
  clientId,
  productId,
  orderId,
  articleNumber,
  setEntryError,
  productState,
}) => {
  const dispatch = useDispatch();

  // ******************************** START CONFIRMATION D'ANNULATION ********************************
  // const { confirmAction } = confirmation;
  // const updateProductActions = (confirmAction) => {
  //   const dynamicProductActions = {
  //     ...Object.fromEntries(
  //       Object.entries(productActions).map(([key, value]) => [
  //         key,
  //         key.startsWith("isAdd") ? key === confirmAction : value,
  //       ])
  //     ),
  //   };
  //   setProductActions((prevState) => ({
  //     ...prevState,
  //     ...dynamicProductActions,
  //   }));
  // };
  // // Confirmation d'une annulation de champ
  // const handleConfirmation = () => {
  //   if (confirmAction === actions.CREDIT) {
  //     setProductActions((prevState) => ({
  //       ...prevState,
  //       isAddCredit: false,
  //       creditContent: { amount: null, dateExpire: null, code: null },
  //     }));
  //     setConfirmation((prevState) => ({
  //       ...prevState,
  //       isConfirmationVisible: false,
  //     }));
  //     setEntryError("");
  //     return dispatch(
  //       updateActionContent({
  //         clientId,
  //         productId,
  //         orderId,
  //         updatedProperty: "credit",
  //         productActionContent: { amount: null, dateExpire: null, code: null },
  //       })
  //     );
  //   }
  //   if (confirmAction) {
  //     dispatch(
  //       updateActionContent({
  //         clientId,
  //         productId,
  //         orderId,
  //         updatedProperty: confirmAction,
  //         productActionContent: null,
  //       })
  //     );
  //     updateProductActions(confirmAction);
  //     setConfirmation((prevState) => ({
  //       ...prevState,
  //       confirmAction: null,
  //       isConfirmationVisible: false,
  //     }));
  //   }
  // };
  // // Infirmer l'annulation
  // const handleCancel = () => {
  //   setConfirmation((prevState) => ({
  //     ...prevState,
  //     isConfirmationVisible: false,
  //     confirmAction: null,
  //   }));
  //   setInteraction((prevState) => ({
  //     ...prevState,
  //     activeLi: null,
  //   }));
  // };

  // ******************************** END CONFIRMATION D'ANNULATION ********************************

  // ******************************** START GESTION DE L'AVOIR ********************************
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

    let { amount, dateExpire } = productActions.creditContent;
    amount = parseInt(amount);
    const selectedDate = new Date(dateExpire);
    const currentDate = new Date();
    const validityDate = selectedDate > currentDate;

    if (!isValidate) {
      setProductActions((prevState) => ({
        ...prevState,
        isAddCredit: false,
        creditContent: { amount: null, dateExpire: null, code: null },
      }));
      setEntryError("");
    } else if (!amount > 0 || !validityDate) {
      if (!amount > 0 && !validityDate) {
        setEntryError(
          "⚠️ Le montant de l'avoir et une date de validité ultérieure doivent être définis."
        );
      } else if (!amount > 0 && validityDate) {
        setEntryError("⚠️ Un montant doit être défini.");
      } else if (amount > 0 && !validityDate) {
        setEntryError("⚠️ Une date ultérieure doit être définie.");
      }
    } else if (amount > 0 && validityDate) {
      const code = generateRandomCode();
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
      setEntryError("");
    }
  };
  // ******************************** END GESTION DE L'AVOIR ********************************

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

    const exchangeValue = productState.exchange
      ? parseInt(productState.exchange)
      : productActions.exchangeContent !== ""
      ? parseInt(productActions.exchangeContent)
      : 0;
    const refundValue = productState.refund
      ? parseInt(productState.refund)
      : productActions.refundContent !== ""
      ? parseInt(productActions.refundContent)
      : 0;
    const articleLimitNumber = Number(exchangeValue) + Number(refundValue);
    const articleAllowedNumber = articleNumber - articleLimitNumber;
    const checkArticleNumber = articleAllowedNumber >= 0;
    if (!checkArticleNumber) {
      setEntryError(
        `⚠️ Le nombre maximal d'articles (${articleNumber}) est dépassé ! `
      );
    }

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

    if (isValidate && productActions[contentKey] > 0 && checkArticleNumber) {
      dispatch(
        updateActionContent({
          clientId,
          productId,
          orderId,
          updatedProperty: action,
          productActionContent,
        })
      );
      setEntryError("");
    }
    if (!isValidate || productActions[contentKey] !== "") {
      const dynamicProperties = isValidate
        ? { [contentKey]: "", [flagKey]: false }
        : { [flagKey]: false, [contentKey]: "" };

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
