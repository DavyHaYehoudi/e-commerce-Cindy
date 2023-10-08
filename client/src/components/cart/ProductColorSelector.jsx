import React, { useState } from "react";
import ColorPicker from "../dumbs/ColorPicker";
import { materials } from "../../mocks/materials";

const ProductColorSelector = () => {
  const [selectedProductColor, setSelectedProductColor] =
    useState("GOLD FILLED");
  const [hoveredColor, setHoveredColor] = useState(null);

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
        colors={materials}
        onSelectColor={handleSelectColor}
        defaultColor={selectedProductColor}
        onHoverColor={handleHoverColor}
      />
      <span>Apprêt : {selectedProductColor}</span>
    </div>
  );
};

export default ProductColorSelector;
