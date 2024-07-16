import React from "react";
import { formatPrice } from "../../../../../helpers/utils/prices";
import { formatDate } from "../../../../../helpers/utils/formatDate";

const Refund = ({ data }) => {
  if (!data) {
    return <div>Chargement en cours...</div>;
  }
  const { totalRefundAmount, refundDetails, totalRefunds } = data;

  return (
    <div className="refunds-stats">
      <div className="tab-stats-content">
        <p>
          Nombre total de remboursements effectués :
          {totalRefunds > 0 ? (
            <>
              <strong> {totalRefunds}</strong> pour un montant cumulé de{" "}
              <span className="out">{formatPrice(totalRefundAmount)}</span>
            </>
          ) : (
            " 0"
          )}
        </p>
      </div>
      <div className="tab-tables-container ">
        <div className="content-table ">
          <h3 className="underline">Remboursements effectués</h3>
          {refundDetails && refundDetails.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Rang</th>
                  <th>Identité</th>
                  <th>Produit</th>
                  <th>Matériau</th>
                  <th>Date de remboursement</th>
                  <th>Montant (€)</th>
                </tr>
              </thead>
              <tbody>
                {refundDetails?.map((refund, index) => (
                  <tr key={index}>
                    <td data-label="Rang">{index + 1}</td>
                    <td data-label="Identité">
                      {refund?.firstName} {refund?.lastName}
                    </td>
                    <td data-label="Produit">{refund?.productName}</td>
                    <td data-label="Matériau">{refund?.materialName}</td>
                    <td data-label="Date de remboursement">
                      {formatDate(refund?.refundDate)}
                    </td>
                    <td data-label="Montant (€)" className="center">
                      {refund?.refundAmount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Aucun remboursement effectué actuellement.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Refund;
