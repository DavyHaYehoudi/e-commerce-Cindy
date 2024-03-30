import React from "react";
import Materials from "./Materials";
import NoMaterials from "./NoMaterials";

const MaterialsSelect = ({ showMaterials, handleMaterialsToggle }) => {
  return (
    <div className="materials-section">
      <div className="materials-radio">
        <span>Matériaux</span>
        <div className="materials-radio-input">
          <input
            type="radio"
            id="materials"
            name="materialType"
            value="materials"
            checked={showMaterials}
            onChange={handleMaterialsToggle}
          />
          <label htmlFor="materials">Avec</label>
        </div>
        <div className="materials-radio-input">
          <input
            type="radio"
            id="noMaterials"
            name="materialType"
            value="noMaterials"
            checked={!showMaterials}
            onChange={handleMaterialsToggle}
          />
          <label htmlFor="noMaterials">Sans</label>
        </div>
      </div>
        {showMaterials ? <Materials /> : <NoMaterials />}
    </div>
  );
};

export default MaterialsSelect;
