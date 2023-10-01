import React from "react";
import bo from "../../assets/bo.png";
import bar from "../../assets/bar.png";
import bra from "../../assets/bra.png";
import col from "../../assets/col.png";
import { Link } from "react-router-dom";
const ProductsAssortments = () => {
  const assortedProducts = [bo, bar, bra, col, bo, bar, bra, col];
  return (
    <div id="products-assortments-section">
      <h2>Mes assortiments</h2>
      <div className="products-assortments-container">
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
