import React from "react";

import { Link } from "react-router-dom";
const ProductsAssortments = () => {
  const assortedProducts = [];
  return (
    <div id="orderProducts-assortments-section">
      <h2>Mes assortiments</h2>
      <div className="orderProducts-assortments-container">
        {assortedProducts.map((product, i) => (
          <div className="assortment-row" key={i}>
            <Link>
              <div className="product-image">
                <img src={product} alt="" />
              </div>
              <div className="product-details">
                <h3> titre </h3>
                <p>€95 EUR</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsAssortments;
