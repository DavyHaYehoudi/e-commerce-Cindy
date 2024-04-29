import React, { useState } from "react";
import { useSelector } from "react-redux";
import OtherOrders from "./OtherOrders";
import DeliveredOrders from "./Delivered";
import { getStepColor } from "../../../helpers/utils/getStepColor";

const Menu = () => {
  const orderHistory = useSelector((state) => state?.customer?.data?.orders);
  const [isActive, setIsActive] = useState("enCours");
  const handleTabClick = (tab) => {
    setIsActive(tab);
  };
  return (
    <div className="order-history">
      <div className="tabs-history">
        <div className="menu">
          <h3
            onClick={() => handleTabClick("enCours")}
            className={isActive === "enCours" ? "active" : ""}
          >
            Commandes en cours
          </h3>
          <h3
            onClick={() => handleTabClick("expediees")}
            className={isActive === "expediees" ? "active" : ""}
          >
            Commandes expédiées
          </h3>
        </div>
      </div>

      <div className="order-items-container">
        {isActive === "enCours" && (
          <OtherOrders
            orderHistory={orderHistory}
            getStepColor={getStepColor}
          />
        )}
        {isActive === "expediees" && (
          <DeliveredOrders
            orderHistory={orderHistory}
            getStepColor={getStepColor}
          />
        )}
      </div>
    </div>
  );
};

export default Menu;
