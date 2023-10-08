import React, { useState } from "react";
import ColorPicker from "../dumbs/ColorPicker";

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

  const materialColors = [
    { name: "GOLD FILLED", value: "#DAB455" },
    { name: "OR ROSE", value: "#FFC0CB" },
    { name: "OR BLANC", value: "#FFF" },
    { name: "ARGENT 925", value: "#C0C0C0" },
  ];

  return (
    <div
      className="product-color-selector-picker info-tooltip"
      aria-label={hoveredColor || selectedProductColor}
    >
      <ColorPicker
        colors={materialColors}
        onSelectColor={handleSelectColor}
        defaultColor={selectedProductColor}
        onHoverColor={handleHoverColor}
      />
      <span>Apprêt : {selectedProductColor}</span>
    </div>
  );
};

export default ProductColorSelector;
