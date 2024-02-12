import React, { useState } from "react";
import OtherOrders from "../components/accountClient/order/OtherOrders";
import DeliveredOrders from "../components/accountClient/order/Delivered";
import InfoClient from "../components/accountClient/info/InfoClient";
import { getStepColor } from "../helpers/utils/getStepColor";
import { useSelector } from "react-redux";
import useFetchSlice from "../selectors/useFetchSlice";

const AccountClient = () => {
  const dataClient = useSelector((state) => state?.customer?.data?.client);
  const orderHistory = useSelector((state) => state?.customer?.data?.orders);
  const [isActive, setIsActive] = useState(null);

  const handleTabClick = (tab) => {
    setIsActive(tab);
  };

  useFetchSlice("customer", "65bc8c5b7f890edc1f63182e");
  useFetchSlice("product");

  return (
    <div className="user-profile-container" data-testid="account-dashboard">
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
