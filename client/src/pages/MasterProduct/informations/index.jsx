import React, { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";

const Informations = () => {
  const [isProductionDetailsOpen, setIsProductionDetailsOpen] = useState(false);
  const [isShippingReturnsOpen, setIsShippingReturnsOpen] = useState(false);

  const toggleProductionDetails = () => {
    setIsProductionDetailsOpen(!isProductionDetailsOpen);
  };

  const toggleShippingReturns = () => {
    setIsShippingReturnsOpen(!isShippingReturnsOpen);
  };
  return (
    <div id="product-aside">
      <div className="additional-details">
        <div
          className={`details-section ${isProductionDetailsOpen ? "open" : ""}`}
          onClick={toggleProductionDetails}
        >
          <p>CONSEILS D'ENTRETIEN</p>
          <button
            className={`rotate ${isProductionDetailsOpen ? "rotate-open" : ""}`}
            aria-label="Ouvrir son contenu"
          >
            <IoIosArrowUp aria-hidden="true" />
          </button>
        </div>
        <div
          className={`production-details ${
            isProductionDetailsOpen ? "open" : ""
          }`}
        >
          Le <b>Gold-Filled</b> est une ancienne technique qui consiste à
          recouvrir d'une épaisse couche d’or de 14 carats, une base en laiton.
          <br />
          Il est hypoallergénique et peut se porter sous l'eau.
          <br />
          Vous cherchiez le côté Something Old ? Le <b>Gold-Filled</b> est de
          l'or recyclé !
          <br />
          Afin de maintenir son bel éclat doré, vous pouvez nettoyer
          délicatement votre bijou à l'eau, avec un savon doux et une
          chamoisine.
        </div>
        <div
          className={`details-section ${isShippingReturnsOpen ? "open" : ""}`}
          onClick={toggleShippingReturns}
        >
          <p>LIVRAISON & RETOUR</p>
          <button
            className={`rotate ${isShippingReturnsOpen ? "rotate-open" : ""}`}
            aria-label="Ouvrir le contenu"
          >
            <IoIosArrowUp aria-hidden="true" />
          </button>
        </div>
        <div
          className={`shipping-returns-info ${
            isShippingReturnsOpen ? "open" : ""
          }`}
        >
          La pièce que vous aurez choisie est fabriquée à la main spécialement
          pour vous. <br />
          <br />
          <span className="underline">Délai de confection</span> : <b>7 à 10 jours</b> - Variable selon la
          période de l'année.
          <br />
          <span className="underline">Livraisons</span> : <b>2 à 4 jours ouvrés</b> pour la France.{" "}
          <b>10 jours</b> en moyenne pour les DOM-TOM et l'étranger.
          <br />
          <span className="underline">Retours</span> : Vous disposez d'un délai de <b>14 jours</b> à compter
          de la réception pour renvoyer votre commande et être remboursé. <br />
          <br />
          Par mesure d'hygiène, nous ne proposons pas de remboursement ni
          d'échange pour les boucles d'oreilles conformément à l'article L221-28
          du Code de la consommation.
          <br />
          <br />
          Pour plus d'informations sur les livraisons et les retours,
          rendez-vous sur la page
          <Link to="/deliveries&returns">
            {" "}
            <span className="underline"> Livraisons & Retours</span>
          </Link>
        </div>
      </div>
      <div className="assortments"></div>
    </div>
  );
};

export default Informations;
