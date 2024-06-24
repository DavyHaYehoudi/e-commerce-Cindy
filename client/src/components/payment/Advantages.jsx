import React from "react";
import { LiaEuroSignSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import { formatDate } from "../../helpers/utils/formatDate";
import isCurrent from "../../helpers/utils/isCurrentDate";
import { FaCheck } from "react-icons/fa";
import useAdvantages from "./hooks/useAdvantages";
const Advantages = () => {
  const { codePromo, giftcard } =
    useSelector((state) => state?.product?.advantages) || {};
  const {
    promoCodeValue,
    setPromoCodeValue,
    giftcardValue,
    setGiftcardValue,
    creditsStore,
    handleCheckPromocode,
    handleCancelPromocode,
    handleCheckGiftcard,
    handleCancelGiftcard,
    handleKeyPressGiftcard,
    handleKeyPressPromocode,
    handleSelectChange,
    handleCreditApply,
    handleKeyPressCredit
  } = useAdvantages();
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
              value={promoCodeValue}
              onChange={(e) => setPromoCodeValue(e.target.value)}
              onKeyDown={(e) =>
                handleKeyPressPromocode({
                  event: e,
                  code: promoCodeValue,
                })
              }
            />
            {codePromo?.isValid && <FaCheck color="var(--success)" />}
            <button
              onClick={() =>
                handleCheckPromocode({
                  code: promoCodeValue,
                })
              }
              disabled={promoCodeValue.trim() === ""}
            >
              Appliquer
            </button>
            <button
              className="cancel"
              onClick={() => handleCancelPromocode({ property: "codePromo" })}
            >
              Annuler
            </button>
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
              value={giftcardValue}
              onChange={(e) => setGiftcardValue(e.target.value)}
              onKeyDown={(e) =>
                handleKeyPressGiftcard({ event: e, code: giftcardValue })
              }
            />
            {giftcard?.isValid && <FaCheck color="var(--success)" />}
            <button
              onClick={() =>
                handleCheckGiftcard({
                  code: giftcardValue,
                })
              }
              disabled={giftcardValue.trim() === ""}
            >
              Appliquer
            </button>
            <button
              className="cancel"
              onClick={() => handleCancelGiftcard({ property: "giftcard" })}
            >
              Annuler
            </button>
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
              onChange={handleSelectChange}
              onKeyDown={handleKeyPressCredit}
            >
              <option value="">Ne pas utiliser</option>
              {creditsStore &&
                creditsStore
                  .filter((credit) => isCurrent(credit?.dateExpire))
                  .map((credit, index) => (
                    <option key={index} value={credit?._id}>
                      {credit?.amount}€ (valable jusqu'au{" "}
                      {formatDate(credit?.dateExpire)})
                    </option>
                  ))}
            </select>
            <button onClick={handleCreditApply} >Appliquer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advantages;
