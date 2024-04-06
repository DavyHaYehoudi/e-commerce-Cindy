import React from "react";
import NoMaterials from "./withoutMaterial/NoMaterials";
import MaterialsRow from "./withMaterial/MaterialsRow";
import { useSelector } from "react-redux";

const MaterialsSelect = ({
  showMaterials,
  handleMaterialsSelectToggle,
  addMaterialData,
  data,
  currentAction,
  currentProductId
}) => {
  const materialsStore = useSelector((state) => state?.material?.data);

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
            onChange={handleMaterialsSelectToggle}
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
            onChange={handleMaterialsSelectToggle}
          />
          <label htmlFor="noMaterials">Sans</label>
        </div>
      </div>
      {showMaterials ? (
        materialsStore.map((material, index) => (
          <MaterialsRow
            key={index}
            material={material}
            addMaterialData={addMaterialData}
            currentAction={currentAction}
            currentProductId={currentProductId}
          />
        ))
      ) : (
        <NoMaterials addMaterialData={addMaterialData} data={data} />
      )}
    </div>
  );
};

export default MaterialsSelect;
