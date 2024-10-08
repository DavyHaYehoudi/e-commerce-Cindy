import React from "react";
import { PiTruckThin } from "react-icons/pi";
import { Link } from "react-router-dom";

const FreeShippingBanner = () => {
  return (
    <div id="freeShippingBanner" className="show animate-banner">
      <Link to="deliveries&returns">
        <span aria-hidden="true">
          <PiTruckThin />
        </span>
        <p> LIVRAISON OFFERTE !</p>
      </Link>
    </div>
  );
};

export default FreeShippingBanner;
