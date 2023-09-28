import React from "react";

const MegaMenu = ({ megaMenuSection }) => {
  const isDisplay1Visible = megaMenuSection === "display1";
  const isDisplay2Visible = megaMenuSection === "display2";
  return (
    <div className={`megaMenu ${
        isDisplay1Visible || isDisplay2Visible ? "visible" : "hidden"
      }`}>
      <div
        className={`megaMenu-display1 ${
          isDisplay1Visible ? "visible" : "hidden"
        }`}
      >
        <div>
          <h3>Accessoires cheveux</h3>
          <div>
            <ul>
              <li>Couronnes</li>
              <li>Peignes et pics</li>
            </ul>
          </div>
        </div>
        <div>
          <h3>Bijoux</h3>
          <div>
            <ul>
              <li>Boucles d'oreilles</li>
              <li>Bracelets</li>
              <li>Colliers</li>
              <li>Colliers de dos</li>
            </ul>
          </div>
        </div>
        <div>
          <h3>Demoiselles d'honneur</h3>
          <div>
            <ul>
              <li>Bracelets</li>
              <li>Cartes cadeau</li>
              <li>Coffret cadeau</li>
            </ul>
          </div>
        </div>
        <div>
          <img src="" alt="" />
        </div>
      </div>
      <div>
        <div
          className={`megaMenu-display2-col ${
            isDisplay2Visible ? "visible" : "hidden"
          }`}
        >
          <h3>Bijoux de mains</h3>
          <h3>Bracelets</h3>
          <h3>Chouchous</h3>
          <h3>Colliers</h3>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
