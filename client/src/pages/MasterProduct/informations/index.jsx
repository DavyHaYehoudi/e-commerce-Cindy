import React from "react";
import illustration from "../../../assets/information.png";
import Dropdown from "../../../shared/Dropdown";
import description from "./content/description";
import deliveries from "./content/deliveries";
import productionTimes from "./content/productionTimes";
import maintenanceGuide from "./content/maintenanceGuide";

const Informations = () => {
  return (
    <div id="master-product-informations">
      <div className="container">
        <div className="title">
          <p className="manufacture">ATELIER NORALYA</p>
          <h3>Informations</h3>
        </div>
        <div className="body">
          <div className="block-left">
            <Dropdown
              title="📃 Description"
              body={description}
              headerClassName="master-product-dropdown-header"
              bodyClassName="master-product-dropdown-body"
            />
            <Dropdown
              title="↩️ Livraisons & Retours"
              body={deliveries}
              headerClassName="master-product-dropdown-header"
              bodyClassName="master-product-dropdown-body"
              linkPath="/terms-of-sales"
              linkText="Voir les CGV"
            />
            <Dropdown
              title="⏳ Délais de confection"
              body={productionTimes}
              headerClassName="master-product-dropdown-header"
              bodyClassName="master-product-dropdown-body"
            />
            <Dropdown
              title="💍  Guide d'entretien"
              body={maintenanceGuide}
              headerClassName="master-product-dropdown-header"
              bodyClassName="master-product-dropdown-body"
            />
          </div>
          <div className="block-right">
            <img src={illustration} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Informations;
