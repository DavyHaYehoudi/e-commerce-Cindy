import React from "react";
import { LiaEuroSignSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import { formatDate } from "../../helpers/utils/formatDate";
import isCurrent from "../../helpers/utils/isCurrentDate";
import { FaCheck } from "react-icons/fa";
import useAdvantages from "./hooks/useAdvantages";
import useAuthWrappers from "../../config/useAuthWrappers";
const Advantages = () => {
  const { codePromo, giftcard, credit } =
    useSelector((state) => state?.product?.advantages) || {};

  const {
    creditsStore,
    handleCheckPromocode,
    handleCancelPromocode,
    handleCheckGiftcard,
    handleCancelGiftcard,
    handleKeyPressGiftcard,
    handleKeyPressPromocode,
    handleKeyPressCredit,
    handleAdvantagesValue,
    handleCreditChange,
  } = useAdvantages();
  const { clientId: getClientId } = useAuthWrappers();
  const clientId = getClientId();
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
            <div className="item-content-input">
              <input
                type="search"
                id="promo"
                name="promo"
                placeholder="Entrez le code promo"
                value={codePromo?.code}
                onChange={(e) =>
                  handleAdvantagesValue({
                    property: "codePromo",
                    value: e.target.value,
                  })
                }
                onKeyDown={(e) =>
                  handleKeyPressPromocode({
                    event: e,
                    code: codePromo?.code,
                  })
                }
              />
              <span className="validate">
                {codePromo?.isValid && <FaCheck color="var(--success)" />}
              </span>
            </div>
            <div className="item-content-buttons">
              <button
                onClick={() =>
                  handleCheckPromocode({
                    code: codePromo?.code,
                  })
                }
                disabled={codePromo?.code.trim() === "" || !clientId}
              >
                Appliquer
              </button>
              <button
                className="cancel"
                onClick={() => handleCancelPromocode({ property: "codePromo" })}
                disabled={!clientId}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
        <div className="item">
          <label htmlFor="giftcard">Carte cadeau</label>
          <div className="item-content">
            <div className="item-content-input">
              <input
                type="search"
                id="giftcard"
                name="giftcard"
                placeholder="Entrez le numéro de votre carte cadeau"
                value={giftcard?.code}
                onChange={(e) =>
                  handleAdvantagesValue({
                    property: "giftcard",
                    value: e.target.value,
                  })
                }
                onKeyDown={(e) =>
                  handleKeyPressGiftcard({ event: e, code: giftcard?.code })
                }
              />
              <span className="validate">
                {giftcard?.isValid && <FaCheck color="var(--success)" />}
              </span>
            </div>
            <div className="item-content-buttons">
              <button
                onClick={() =>
                  handleCheckGiftcard({
                    code: giftcard?.code,
                  })
                }
                disabled={giftcard?.code.trim() === "" || !clientId}
              >
                Appliquer
              </button>
              <button
                className="cancel"
                onClick={() => handleCancelGiftcard({ property: "giftcard" })}
                disabled={!clientId}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
        <div className="item">
          <label htmlFor="credit">Mes avoirs</label>
          <div className="item-content credit">
            <select
              id="credit"
              name="credit"
              placeholder="Choisir"
              value={credit?.creditId || "none"}
              onChange={(e) => handleCreditChange(e.target.value)}
              onKeyDown={handleKeyPressCredit}
            >
              <option value="none">Ne pas utiliser</option>
              {creditsStore &&
                creditsStore
                  .filter(
                    (credit) =>
                      isCurrent(credit?.dateExpire) && !credit?.isArchived
                  )
                  .map((credit, index) => (
                    <option key={index} value={credit?._id}>
                      {credit?.amount}€ (valable jusqu'au{" "}
                      {formatDate(credit?.dateExpire)})
                    </option>
                  ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advantages;
