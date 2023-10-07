import React from "react";

const AddToCartButton = ({
  onClick,
  additionalFunction,
  buttonText,
  className,
}) => {
  const handleClick = () => {
    onClick();
    additionalFunction();
  };

  return (
    <button className={className} onClick={handleClick}>
      {buttonText}
    </button>
  );
};

export default AddToCartButton;
