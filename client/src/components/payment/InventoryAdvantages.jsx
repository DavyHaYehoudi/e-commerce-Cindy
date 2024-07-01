import React from "react";
import { formatPrice } from "../../helpers/utils/prices";
import useInventoryAdvantages from "./hooks/useInventoryAdvantages";

const InventoryAdvantages = () => {
  const { intermediateAmounts, cartTotalAmount, codePromo, giftcard, credit } =
    useInventoryAdvantages();

  return (
    <div className="inventoryAdvantages">
      {(codePromo?.percentage || giftcard?.amount || credit?.amount) && (
        <>
          <p>Prix initial du panier : {formatPrice(cartTotalAmount)}</p>
          <table>
            <thead>
              <tr>
                <th>Mes avantages</th>
                <th>Réduction</th>
                <th>Déduction</th>
                <th>
                  Nouveau montant <br />
                </th>
              </tr>
            </thead>
            <tbody>
              {codePromo && codePromo?.percentage && (
                <tr>
                  <td data-label="Mes avantages">Code promo</td>
                  <td data-label="Réduction">{codePromo?.percentage}%</td>
                  <td data-label="Déduction">
                    -
                    {formatPrice(
                      (cartTotalAmount * codePromo?.percentage) / 100
                    )}
                  </td>
                  <td data-label="Nouveau montant">
                    {formatPrice(
                      intermediateAmounts.codePromo || cartTotalAmount
                    )}
                  </td>
                </tr>
              )}
              {giftcard && giftcard?.amount && (
                <tr>
                  <td data-label="Mes avantages">Carte cadeau</td>
                  <td data-label="Réduction">
                    {formatPrice(giftcard?.amount)}
                  </td>
                  <td data-label="Déduction">
                    -{formatPrice(giftcard?.amount)}
                  </td>
                  <td data-label="Nouveau montant">
                    {formatPrice(
                      intermediateAmounts.giftcard || cartTotalAmount
                    )}
                  </td>
                </tr>
              )}
              {credit && credit?.amount && (
                <tr>
                  <td data-label="Mes avantages">Avoir</td>
                  <td data-label="Réduction">{formatPrice(credit?.amount)}</td>
                  <td data-label="Déduction">-{formatPrice(credit?.amount)}</td>
                  <td data-label="Nouveau montant">
                    {formatPrice(intermediateAmounts.credit || cartTotalAmount)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default InventoryAdvantages;
