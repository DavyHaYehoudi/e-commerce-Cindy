import React, { useState } from "react";
import { processProduct } from "../../../../../features/admin/productActionsSlice";
import * as actions from "../../../../../constants/productActions";
import { useDispatch } from "react-redux";

const ItemActions = ({
  clientId,
  productId,
  orderId,
  isCreditValue,
  isGenerateCredit,
  activeLi,
  setActiveLi,
  isAddNote,
  setIsAddNote,
  setIsGenerateCredit,
  setIsConfirmationVisible,
  setConfirmAction,
  productState,
}) => {
  const dispatch = useDispatch();
  const [creditAmount, setCreditAmount] = useState("");

  const handleActionClick = (action) => {
    setActiveLi(action);
    switch (action) {
      case actions.ADD_NOTE:
        setIsAddNote(!isAddNote);
        break;
      case actions.GENERATE_CREDIT:
        if (creditAmount) {
          return handleGenerateCredit();
        }
        break;
      case actions.EXCHANGE:
      case actions.REFUND:
        handleCreditAction(action);
        break;
      default:
        console.log("Error action clic");
    }
  };
  const handleGenerateCredit = () => {
    dispatch(
      processProduct({
        clientId,
        productId,
        orderId,
        process: actions.GENERATE_CREDIT,
        creditValue: creditAmount,
      })
    );
  };

  const handleCancelCreditAmount = () => {
    dispatch(
      processProduct({
        clientId,
        productId,
        orderId,
        process: actions.GENERATE_CREDIT,
        creditValue: null,
      })
    );
    setIsGenerateCredit(false);
    setCreditAmount("");
  };
  const handleCreditAction = (action) => {
    if (isCreditValue !== null) {
      setIsConfirmationVisible(true);
      setConfirmAction(action);
    } else {
      dispatch(
        processProduct({
          clientId,
          productId,
          orderId,
          process: action,
        })
      );
    }
  };
  const handleClicGenerateCreditLine = () => {
    setIsGenerateCredit(true);
    setActiveLi(actions.GENERATE_CREDIT);
  };
  const handleCreditAmount = (e) => {
    setCreditAmount(e.target.value);
  };
  const handleCancelAction = (action) => {
    switch (action) {
      case actions.GENERATE_CREDIT:
        dispatch(
          processProduct({
            clientId,
            productId,
            orderId,
            process: actions.GENERATE_CREDIT,
            creditValue: null,
          })
        );
        setIsGenerateCredit(false);
    setCreditAmount("");
        break;
      case actions.EXCHANGE:
      case actions.REFUND:
        dispatch(
          processProduct({
            clientId,
            productId,
            orderId,
            process: action,
            [action]: !productState[action],
          })
        );
        break;
      default:
        console.log("error in handleCancleAction");
    }
  };

  return (
    <ul className="actions-list">
      {productState.exchange ? (
        <li
          className={activeLi === actions.EXCHANGE ? "active" : ""}
          onClick={() => handleCancelAction(actions.EXCHANGE)}
        >
          Annuler l'échange
        </li>
      ) : (
        <li
          className={activeLi === actions.EXCHANGE ? "active" : ""}
          onClick={() => handleActionClick(actions.EXCHANGE)}
        >
          Echange
        </li>
      )}
      {productState.refund ? (
        <li
          className={activeLi === actions.REFUND ? "active" : ""}
          onClick={() => handleCancelAction(actions.REFUND)}
        >
          Annuler le remboursement
        </li>
      ) : (
        <li
          className={activeLi === actions.REFUND ? "active" : ""}
          onClick={() => handleActionClick(actions.REFUND)}
        >
          Remboursement
        </li>
      )}

      {productState.generateCredit ? (
        <li
          className={activeLi === actions.GENERATE_CREDIT ? "active" : ""}
          onClick={() => handleCancelCreditAmount()}
        >
          Annuler l'avoir
        </li>
      ) : (
        <>
          <li
            className={activeLi === actions.GENERATE_CREDIT ? "active" : ""}
            onClick={() => handleClicGenerateCreditLine()}
          >
            Générer un avoir
            {isGenerateCredit && (
              <>
                <input
                  type="number"
                  id="generateCreditField"
                  value={creditAmount}
                  onChange={(e) => handleCreditAmount(e)}
                  placeholder="Montant de l'avoir"
                />

                <button
                  className="btn1"
                  onClick={() => handleActionClick(actions.GENERATE_CREDIT)}
                >
                  Valider
                </button>
                <button className="btn2" onClick={() => setCreditAmount("")}>
                  Annuler
                </button>
              </>
            )}
          </li>
        </>
      )}
      <li
        className={activeLi === actions.ADD_NOTE ? "active" : ""}
        onClick={() => handleActionClick(actions.ADD_NOTE)}
      >
        Ajouter une note
      </li>
    </ul>
  );
};

export default ItemActions;
