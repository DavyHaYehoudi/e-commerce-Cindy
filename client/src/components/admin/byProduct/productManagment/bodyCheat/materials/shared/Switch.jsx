import React, { useState } from 'react';

const Switch = ({ checked, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    onChange(newState);
  };

  return (
    <div className={`switch ${isChecked ? 'checked' : ''}`} onClick={handleToggle}>
      <div className="slider"></div>
    </div>
  );
};

export default Switch;
