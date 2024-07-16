import React from "react";
import { formatPrice } from "../../../../../helpers/utils/prices";
import { formatDate } from "../../../../../helpers/utils/formatDate";

const Credit = ({ data }) => {
  if (!data) {
    return <div>Chargement en cours...</div>;
  }

  const {
    activeCreditDetails,
    activeCredits,
    totalCredits,
    usedCreditDetails,
    usedCredits,
  } = data;

  return (
    <div className="credits-stats">
      <div className="tab-stats-content">
        <p>
          Nombre total d'avoirs émis :
          {totalCredits?.count > 0 ? (
            <>
              <strong> {totalCredits?.count}</strong> pour un montant cumulé de{" "}
              <span className="out">
                {formatPrice(totalCredits?.totalAmount)}
              </span>
            </>
          ) : (
            " 0"
          )}
        </p>
        <p>
          Nombre d'avoirs en cours :{" "}
          {activeCredits?.count > 0 ? (
            <>
              <strong>{activeCredits?.count} </strong>
              pour un montant cumulé de{" "}
              <span className="out">
                {formatPrice(totalCredits?.totalAmount)}
              </span>
            </>
          ) : (
            " 0"
          )}
        </p>
        <p>
          Nombre d'avoirs utilisés :{" "}
          {usedCredits?.totalAmount > 0 ? (
            <>
              <strong>{usedCredits?.count}</strong> pour un montant cumulé de{" "}
              <span className="in">
                {" "}
                {formatPrice(usedCredits?.totalAmount)}
              </span>
            </>
          ) : (
            " 0"
          )}
        </p>
      </div>
      <div className="tab-tables-container">
        <div className="content-table">
          <h3 className="underline">Avoirs attribués en cours</h3>
          {activeCreditDetails && activeCreditDetails.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Rang</th>
                  <th>Identité</th>
                  <th>Date d'émission</th>
                  <th>Montant (€)</th>
                </tr>
              </thead>
              <tbody>
                {activeCreditDetails?.map((credit, index) => (
                  <tr key={index}>
                    <td data-label="Rang">{index + 1}</td>
                    <td data-label="Identité">
                      {credit?.firstName} {credit?.lastName}
                    </td>
                    <td data-label="Date d'émission">{formatDate(credit?.awardedAt)}</td>
                    <td data-label="Montant (€)" className="center">{credit?.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Aucun avoir émis actuellement.</p>
          )}
        </div>
        <div className="content-table">
          <h3 className="underline">Avoirs utilisés</h3>
          {usedCreditDetails && usedCreditDetails.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Rang</th>
                  <th>Identité</th>
                  <th>Date d'utilisation</th>
                  <th>Montant (€)</th>
                </tr>
              </thead>
              <tbody>
                {usedCreditDetails?.map((credit, index) => (
                  <tr key={index}>
                    <td data-label="Rang">{index + 1}</td>
                    <td data-label="Identité">
                      {credit?.firstName} {credit?.lastName}
                    </td>
                    <td data-label="Date d'utilisation">{formatDate(credit?.usedAt)}</td>
                    <td data-label="Montant (€)" className="center">{credit?.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Aucun avoir utilisé actuellement.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Credit;
