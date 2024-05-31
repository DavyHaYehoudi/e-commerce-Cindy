import React from "react";
import ColorPicker from "../../../shared/ColorPicker";
import { useSelector } from "react-redux";

const ProductColorSelector = ({
  materialSelected,
  handleMaterialSelected,
  materialsProductId,
}) => {
  const materialsStore = useSelector((state) => state?.material?.data);
  const materialName =
    materialsStore.find((material) => material._id === materialSelected.id)
      ?.name || "";

  return (
    <div className="product-color-selector-picker">
      <ColorPicker
        materialsStore={materialsStore}
        materialSelected={materialSelected}
        handleMaterialSelected={handleMaterialSelected}
        materialsProductId={materialsProductId}
        materialName={materialName}
      />
      {materialName && <span>Matériau : {materialName}</span>}
    </div>
  );
};

export default ProductColorSelector;
