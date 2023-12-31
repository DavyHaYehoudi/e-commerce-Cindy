import React, { useState } from "react";
import OtherOrders from "../components/accountClient/order/OtherOrders";
import DeliveredOrders from "../components/accountClient/order/Delivered";
import InfoClient from "../components/accountClient/info/InfoClient";
import { getStepColor } from "../helpers/utils/getStepColor";
import { useSelector } from "react-redux";
import useFetchSlice from "../selectors/useFetchSlice";

const AccountClient = () => {
  const orderHistory = useSelector((state) => state?.client?.data?.orders);
  const dataClient = useSelector((state) => state?.client?.data?.client);
  const [isActive, setIsActive] = useState(null);

  const handleTabClick = (tab) => {
    setIsActive(tab);
  };

  useFetchSlice("client", "1mongoDb");
  useFetchSlice("product");

  return (
    <div className="user-profile-container">
      <InfoClient dataClient={dataClient} />
      <div className="order-history">
        <h2>Historique des commandes</h2>
        <div className="tabs-history">
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
    </div>
  );
};

export default AccountClient;
