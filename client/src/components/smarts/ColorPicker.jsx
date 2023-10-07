import React, { useState } from "react";

const ColorPicker = ({ colors, onSelectColor, defaultColor }) => {
  const [selectedColor, setSelectedColor] = useState(defaultColor);

  const handleColorClick = (color) => {
    setSelectedColor(color);
    onSelectColor(color);
  };

  return (
    <div className="custom-color-selector" >
      {colors.map((color) => (
        <div
          key={color.name}
          className={`color-option ${
            color.name === selectedColor ? "selected" : ""
          }`}
          style={{ backgroundColor: color.value }}
          onClick={() => handleColorClick(color.name)}
        ></div>
      ))}
    </div>
  );
};

export default ColorPicker;
