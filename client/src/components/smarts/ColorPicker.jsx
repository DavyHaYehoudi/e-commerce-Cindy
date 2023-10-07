import React, { useState } from "react";

const ColorPicker = ({ colors, onSelectColor, defaultColor, onHoverColor }) => {
  const [selectedColor, setSelectedColor] = useState(defaultColor);

  const handleColorClick = (color) => {
    setSelectedColor(color);
    onSelectColor(color);
  };

  const handleColorHover = (color) => {
    onHoverColor(color);
  };

  return (
    <div className="color-picker">
      {colors.map((color) => (
        <div
          key={color.name}
          className={`color-option ${
            color.name === selectedColor ? "selected" : ""
          }`}
          style={{ backgroundColor: color.value }}
          onClick={() => handleColorClick(color.name)}
          onMouseEnter={() => handleColorHover(color.name)}
          onMouseLeave={() => handleColorHover(null)}
        ></div>
      ))}
    </div>
  );
};

export default ColorPicker;
