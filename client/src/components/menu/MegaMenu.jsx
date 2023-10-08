import React from "react";
import bo from "../../assets/bo.png";
import MegaMenuItem from "./MegaMenuItem";

const MegaMenu = ({ megaMenuSection }) => {
  const isDisplay1Visible = megaMenuSection === "display1";
  const isDisplay2Visible = megaMenuSection === "display2";

  return (
    <div id="mega-Menu">
      <div className={`mega-Menu-Display ${isDisplay1Visible || isDisplay2Visible ? "visible" : "hidden"}`}>
        <div className={`mega-Menu-Display-1 ${isDisplay1Visible ? "visible" : "hidden"}`}>
          <MegaMenuItem
            category="Accessoires Cheveux"
            subcategories={["Couronnes", "Peignes et Pics"]}
          />
          <MegaMenuItem
            category="Bijoux"
            subcategories={["Boucles d'oreilles", "Bracelets", "Colliers", "Colliers de dos"]}
          />
          <MegaMenuItem
            category="Demoiselles d'honneur"
            subcategories={["Bracelets", "Cartes cadeau", "Coffret cadeau"]}
          />
          <figure>
            <img src={bo} alt="" />
            <figcaption>Mes boucles d'oreilles</figcaption>
          </figure>
        </div>
        <div className={`mega-Menu-Display-2 ${isDisplay2Visible ? "visible" : "hidden"}`}>
          <MegaMenuItem
            category="Accessoires Cheveux"
            subcategories={["Chouchous"]}
          />
          <MegaMenuItem
            category="Bien-être"
            subcategories={["Eaux florales", "Pochettes maquillage", "Roll-on visage"]}
          />
          <MegaMenuItem
            category="Bijoux"
            subcategories={["Bijoux de mains", "Boucles d'oreilles", "Bracelets", "Colliers"]}
          />
          <figure>
            <img src={bo} alt="" />
            <figcaption>Mes boucles d'oreilles</figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
