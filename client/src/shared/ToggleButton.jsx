import React, { useState } from "react";

const ToggleButton = ({ initialText, hiddenText, content, buttonClass }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button className={buttonClass} onClick={handleToggle}>
        {isVisible ? hiddenText : initialText}
      </button>
      {isVisible && content}
    </div>
  );
};

export default ToggleButton;
