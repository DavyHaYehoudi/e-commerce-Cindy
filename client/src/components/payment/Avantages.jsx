import React from "react";
import { LiaEuroSignSolid } from "react-icons/lia";
const Avantages = () => {
  return (
    <div id="payment-form-advantages">
      <div className="title">
        <h2>AVANTAGES</h2>
        <LiaEuroSignSolid className="icon" aria-hidden="true" />
      </div>
      <div className="container">
        <div className="item">
          <label htmlFor="codePromo">Code promo</label>
          <div className="item-content">
            <input
              type="search"
              id="codePromo"
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
        <option defaultValue="france">Ne pas utiliser</option>
        <option value="belgium">20€ <small>(valable jusqu'au :)</small> </option>
        <option value="switzerland">45€ <small>(valable jusqu'au :)</small> </option>
      </select>
            <button>Valider</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avantages;
