import React, { useState } from "react";
import ColorPicker from "./ColorPicker";

const ProductColorSelector = () => {
  const [selectedProductColor, setSelectedProductColor] = useState("Gold Filled");

  const handleSelectColor = (color) => {
    setSelectedProductColor(color);
  };

  const materialColors = [
    { name: "Gold Filled", value: "#DAB455" },
    { name: "Or rose", value: "#FFC0CB" },
    { name: "Or blanc", value: "#FFF" },
    { name: "Argent 925", value: "#C0C0C0" },
  ];

  return (
    <div className="product-color-selector-picker">
    <span>APPRETS :</span>
    <ColorPicker
      colors={materialColors}
      onSelectColor={handleSelectColor}
      defaultColor={selectedProductColor}
    />
    <span>{selectedProductColor}</span>
  </div>
  );
};

export default ProductColorSelector;
