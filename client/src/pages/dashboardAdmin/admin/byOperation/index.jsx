import React, { useState } from "react";
import Promocodes from "./Promocodes";
import OtherOpe from "./OtherOpe";
import { ToastContainer } from "react-toastify";

const Operations = () => {
  const [isActive, setIsActive] = useState(null);
  const handleTabClick = (tab) => {
    setIsActive(tab);
  };
  return (
    <div className="operations">
      <h1>OPERATIONS</h1>
      <div className="tabs-operations">
        <h2
          onClick={() => handleTabClick("promoCode")}
          className={isActive === "promoCode" ? "active" : ""}
        >
          Codes promo
        </h2>
        <h2
          onClick={() => handleTabClick("otherPromo")}
          className={isActive === "otherPromo" ? "active" : ""}
        >
          Autre opération
        </h2>
      </div>
      <div className="operation-items-container">
        {isActive === "promoCode" && <Promocodes />}
        {isActive === "otherPromo" && <OtherOpe />}
      </div>
      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default Operations;
