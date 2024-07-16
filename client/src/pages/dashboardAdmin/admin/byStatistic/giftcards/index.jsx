import React from "react";
import { formatPrice } from "../../../../../helpers/utils/prices";
import { formatDate } from "../../../../../helpers/utils/formatDate";

const Giftcard = ({ data }) => {
  console.log(data);
  if (!data) {
    return <div>Chargement en cours...</div>;
  }
  const {
    totalAmountGiftcards,
    totalAmountUsedGiftcards,
    totalAmountValidGiftcards,
    totalGiftcards,
    usedGiftcards,
    usedGiftcardsDetails,
    validGiftcards,
    validGiftcardsDetails,
  } = data;

  return (
    <div className="giftcards-stats">
      <div className="tab-stats-content">
        <p>
          Nombre total de cartes cadeaux achetées :
          {totalGiftcards > 0 ? (
            <>
              <strong> {totalGiftcards}</strong> pour un montant cumulé de{" "}
              <span className="out">{formatPrice(totalAmountGiftcards)}</span>
            </>
          ) : (
            " 0"
          )}
        </p>
        <p>
          Nombre de cartes cadeaux en cours :{" "}
          {validGiftcards > 0 ? (
            <>
              <strong>{validGiftcards} </strong>
              pour un montant cumulé de{" "}
              <span className="out">
                {formatPrice(totalAmountValidGiftcards)}
              </span>
            </>
          ) : (
            " 0"
          )}
        </p>
        <p>
          Nombre de cartes cadeaux utilisées :{" "}
          {usedGiftcards > 0 ? (
            <>
              <strong>{usedGiftcards} </strong>pour un montant cumulé de{" "}
              <span className="in">
                {formatPrice(totalAmountUsedGiftcards)}
              </span>
            </>
          ) : (
            " 0"
          )}
        </p>
      </div>
      <div className="tab-tables-container">
        <div className="content-table">
          <h3 className="underline">Cartes cadeaux en cours</h3>
          {validGiftcardsDetails && validGiftcardsDetails.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Rang</th>
                  <th>Identité</th>
                  <th>Date d'achat</th>
                  <th>Montant (€)</th>
                </tr>
              </thead>
              <tbody>
                {validGiftcardsDetails?.map((giftcard, index) => (
                  <tr key={index}>
                    <td data-label="Rang">{index + 1}</td>
                    <td data-label="Identité">
                      {giftcard?.firstName} {giftcard?.lastName}
                    </td>
                    <td data-label="Date d'achat">{formatDate(giftcard?.createdAt)}</td>
                    <td data-label="Montant (€)" className="center">{giftcard?.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Aucune carte cadeau achetée actuellement.</p>
          )}
        </div>
        <div className="content-table">
          <h3 className="underline">Cartes cadeaux utilisées</h3>
          {usedGiftcardsDetails && usedGiftcardsDetails.length > 0 ? (
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
                {usedGiftcardsDetails?.map((giftcard, index) => (
                  <tr key={index}>
                    <td data-label="Rang">{index + 1}</td>
                    <td data-label="Identité">
                      {giftcard?.firstName} {giftcard?.lastName}
                    </td>
                    <td data-label="Date d'utilisation">{formatDate(giftcard?.updatedAt)}</td>
                    <td data-label="Montant (€)" className="center">{giftcard?.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Aucune carte cadeau utilisée actuellement.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Giftcard;
