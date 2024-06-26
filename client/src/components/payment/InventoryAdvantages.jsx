import React from "react";
import { formatPrice } from "../../helpers/utils/prices";
import useInventoryAdvantages from "./hooks/useInventoryAdvantages";

const InventoryAdvantages = () => {
  const { intermediateAmounts, cartTotalAmount, codePromo, giftcard, credit } =
    useInventoryAdvantages();

  return (
    <div className="inventoryAdvantages">
      {(codePromo?.percentage || giftcard?.amount || credit?.amount) && (
        <table>
          <thead>
            <tr>
              <th>Mes avantages</th>
              <th>Réduction</th>
              <th>Montant</th>
              <th>
                Panier <br />
                {formatPrice(cartTotalAmount)}{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {codePromo && codePromo?.percentage && (
              <tr>
                <td data-label="Mes avantages">Code promo</td>
                <td data-label="Réduction">{codePromo?.percentage}%</td>
                <td data-label="Montant">
                  -
                  {formatPrice((cartTotalAmount * codePromo?.percentage) / 100)}
                </td>
                <td data-label="Panier">
                  {formatPrice(
                    intermediateAmounts.codePromo || cartTotalAmount
                  )}
                </td>
              </tr>
            )}
            {giftcard && giftcard?.amount && (
              <tr>
                <td data-label="Mes avantages">Carte cadeau</td>
                <td data-label="Réduction">{formatPrice(giftcard?.amount)}</td>
                <td data-label="Montant">-{formatPrice(giftcard?.amount)}</td>
                <td data-label="Panier">
                  {formatPrice(intermediateAmounts.giftcard || cartTotalAmount)}
                </td>
              </tr>
            )}
            {credit && credit?.amount && (
              <tr>
                <td data-label="Mes avantages">Avoir</td>
                <td data-label="Réduction">{formatPrice(credit?.amount)}</td>
                <td data-label="Montant">-{formatPrice(credit?.amount)}</td>
                <td data-label="Panier">
                  {formatPrice(intermediateAmounts.credit || cartTotalAmount)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InventoryAdvantages;
