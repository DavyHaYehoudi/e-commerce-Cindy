import React from "react";
import { formatPrice } from "../../../../helpers/utils/prices";
import { statsBalance } from "../../../../helpers/utils/stats";

const Balance = ({ data }) => {
  if (!data) {
    return <div>Chargement en cours...</div>;
  }
  const {
    totalOrderAmount,
    totalAmountGiftcards,
    totalOrdersCanceledAmount,
    totalRefundAmount,
    totalCredits,
  } = data;
  const {balance,inTotal,outTotal}= statsBalance(totalOrderAmount,
    totalAmountGiftcards,
    totalOrdersCanceledAmount,
    totalRefundAmount,
    totalCredits?.totalAmount)
  return (
    <div className="balance-stats">
      <div className="tab-stats-content">
        <h2>Balance : <span className="in">{formatPrice(balance)}</span>  </h2>
        <div className="balance-content">
          <div className="block">
            <p className="underline">
              Total des entrées :<span className="in">{" "} {formatPrice(inTotal)} </span>{" "}
            </p>
            <p>
              <small>Commandes :</small> {formatPrice(totalOrderAmount)}
            </p> 
            <p>
              <small>Cartes-cadeaux :</small> {formatPrice(totalAmountGiftcards)}
            </p>
          </div>
          <div className="block">
            <p className="underline">
              Total des sorties :<span className="out">{" "} {formatPrice(outTotal)} </span>
            </p>
            <p>
              <small>Commandes annulées :</small> {formatPrice(totalOrdersCanceledAmount)}
            </p>
            <p>
              <small>Remboursements :</small> {formatPrice(totalRefundAmount)}
            </p>
            <p>
              <small>Avoirs :</small> {formatPrice(totalCredits?.totalAmount)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
