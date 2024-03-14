import React, { useState } from "react";
import ColorPicker from "../../shared/ColorPicker";
// import { materials } from "../../constants/materials";
import { useSelector } from "react-redux";

const ProductColorSelector = () => {
  const [selectedProductColor, setSelectedProductColor] =
    useState("GOLD FILLED");
  const [hoveredColor, setHoveredColor] = useState(null);
  const materialStore = useSelector((state) => state?.material?.data);


  const handleSelectColor = (color) => {
    setSelectedProductColor(color);
  };

  const handleHoverColor = (color) => {
    setHoveredColor(color);
  };

  return (
    <div
      className="product-color-selector-picker info-tooltip"
      aria-label={hoveredColor || selectedProductColor}
    >
      <ColorPicker
        // colors={materials}
        colors={materialStore}
        onSelectColor={handleSelectColor}
        defaultColor={selectedProductColor}
        onHoverColor={handleHoverColor}
      />
      <span>Apprêt : {selectedProductColor}</span>
    </div>
  );
};

export default ProductColorSelector;
