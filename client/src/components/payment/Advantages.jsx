import React from "react";
import { LiaEuroSignSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import { formatDate } from "../../helpers/utils/formatDate";
import isCurrent from "../../helpers/utils/isCurrentDate"
const Advantages = () => {
  const creditsStore = useSelector((state) => state?.customer?.data?.credit);

  return (
    <div id="payment-form-advantages">
      <div className="title">
        <h2>AVANTAGES</h2>
        <LiaEuroSignSolid className="icon" aria-hidden="true" />
      </div>
      <div className="container">
        <div className="item">
          <label htmlFor="promo">Code promo</label>
          <div className="item-content">
            <input
              type="search"
              id="promo"
              name="promo"
              placeholder="Entrez le code promo"
            />
            <button>Valider</button>
          </div>
        </div>
        <div className="item">
          <label htmlFor="giftcard">Carte cadeau</label>
          <div className="item-content">
            <input
              type="search"
              id="giftcard"
              name="giftcard"
              placeholder="Entrez le numéro de votre carte cadeau"
            />
            <button>Valider</button>
          </div>
        </div>
        <div className="item">
          <label htmlFor="credit">Mes avoirs</label>
          <div className="item-content">
            <select
              id="credit"
              name="credit"
              placeholder="Choisir"
              // value={selectedValue}
              // onChange={handleSelectChange}
            >
              <option value="none">Ne pas utiliser</option>
              {creditsStore &&
                creditsStore.filter(credit=>isCurrent(credit?.dateExpire)).map((credit, index) => (
                  <option key={index} value={credit?.amount}>
                    {credit?.amount}€{" "}
                    (valable jusqu'au {formatDate(credit?.dateExpire) })
                  </option>
                ))}
            </select>
            <button>Valider</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advantages;
