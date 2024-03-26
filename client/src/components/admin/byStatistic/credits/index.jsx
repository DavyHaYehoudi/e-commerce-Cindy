import React from "react";
import { formatPrice } from "../../../../helpers/utils/prices";
import { formatDate } from "../../../../helpers/utils/formatDate";

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
          Nombre d'avoirs utilisés :
         { usedCredits?.amount>0?  <>
           <strong>{usedCredits?.amount}</strong>pour
          un montant cumulé de {formatPrice(usedCredits?.totalAmount)}
            </>:" 0"}
        </p>
      </div>
      <div className="tab-tables-container ">
        <div className="content-table ">
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
                    <td>{index + 1}</td>
                    <td>
                      {credit?.firstName} {credit?.lastName}{" "}
                    </td>
                    <td>{formatDate(credit?.awardedAt)}</td>
                    <td className="center">{credit?.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Aucun avoir émis actuellement.</p>
          )}
        </div>
        <div className="content-table ">
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
                    <td>{index + 1}</td>
                    <td>
                      {credit?.firstName} {credit?.lastName}{" "}
                    </td>
                    <td>{formatDate(credit?.usedAt)}</td>
                    <td className="center">{credit?.amount}</td>
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
