import React, { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

const ProductAside = () => {
  const [isProductionDetailsOpen, setIsProductionDetailsOpen] = useState(false);
  const [isShippingReturnsOpen, setIsShippingReturnsOpen] = useState(false);

  const toggleProductionDetails = () => {
    setIsProductionDetailsOpen(!isProductionDetailsOpen);
  };

  const toggleShippingReturns = () => {
    setIsShippingReturnsOpen(!isShippingReturnsOpen);
  };
  return (
    <div id="product-aside">
      <div className="additional-details">
        <div
          className={`details-section ${isProductionDetailsOpen ? "open" : ""}`}
          onClick={toggleProductionDetails}
        >
          <p>MON SAVOIR-FAIRE</p>
          <button
            className={`rotate ${isProductionDetailsOpen ? "rotate-open" : ""}`}
          >
            <IoIosArrowUp />
          </button>
        </div>
        <div
          className={`production-details ${
            isProductionDetailsOpen ? "open" : ""
          }`}
        >
          Lorem, ipsum dolor sit amet
          <br /> consectetur adipisicing elit.
          <br /> Fugit alias eveniet ducimus eum officia
          <br />. praesentium debitis repudiandae unde accusantium
          <br /> excepturi?
        </div>
        <div
          className={`details-section ${isShippingReturnsOpen ? "open" : ""}`}
          onClick={toggleShippingReturns}
        >
          <p>LIVRAISONS et RETOURS</p>
          <button
            className={`rotate ${isShippingReturnsOpen ? "rotate-open" : ""}`}
          >
            <IoIosArrowUp />
          </button>
        </div>
        <div
          className={`shipping-returns-info ${
            isShippingReturnsOpen ? "open" : ""
          }`}
        >
          Lorem, ipsum dolor sit amet
          <br /> consectetur adipisicing elit.
          <br /> Fugit alias eveniet ducimus eum officia
          <br />. praesentium debitis repudiandae unde accusantium
          <br /> excepturi?
        </div>
      </div>
      <div className="assortments"></div>
    </div>
  );
};

export default ProductAside;
