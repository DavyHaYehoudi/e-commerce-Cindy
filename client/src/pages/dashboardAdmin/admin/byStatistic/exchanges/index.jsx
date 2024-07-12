import React from "react";
import { formatDate } from "../../../../../helpers/utils/formatDate";

const Exchange = ({ data }) => {
  if (!data) {
    return <div>Chargement en cours...</div>;
  }
  const { exchangeDetails, totalExchanges } = data;

  return (
    <div className="exchanges-stats">
      <div className="tab-stats-content">
        <p>Nombre total d'échanges effectués : {totalExchanges}</p>
      </div>
      <div className="tab-tables-container">
        <div className="content-table">
          <h3 className="underline">Echanges effectués</h3>
          {exchangeDetails && exchangeDetails.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Rang</th>
                  <th>Identité</th>
                  <th>Produit</th>
                  <th>Matériau</th>
                  <th>Date d'échange</th>
                  <th>Quantité</th>
                </tr>
              </thead>
              <tbody>
                {exchangeDetails?.map((exchange, index) => (
                  <tr key={index}>
                    <td data-label="Rang">{index + 1}</td>
                    <td data-label="Identité">
                      {exchange?.firstName} {exchange?.lastName}
                    </td>
                    <td data-label="Produit">{exchange?.productName}</td>
                    <td data-label="Matériau">{exchange?.materialName}</td>
                    <td data-label="Date d'échange">{formatDate(exchange?.exchangeDate)}</td>
                    <td data-label="Quantité" className="center">{exchange?.exchangedQuantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Aucun échange effectué actuellement.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exchange;
