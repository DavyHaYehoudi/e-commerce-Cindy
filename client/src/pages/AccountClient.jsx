import React, { useState } from "react";
import OtherOrders from "../components/accountClient/order/OtherOrders";
import DeliveredOrders from "../components/accountClient/order/Delivered";
import UserInfo from "../components/accountClient/info/UserInfo";
import { getStepColor } from "../helpers/getStepColor";
import { orderHistoryUser } from "../mocks/orderHistoryUser";
import { userMock } from "../mocks/userMock";

const AccountClient = () => {
  const [userData] = useState(userMock);
  const [orderHistory] = useState(orderHistoryUser);

  return (
    <div className="user-profile-container">
      <UserInfo userData={userData} />
      <div className="order-history">
        <h2>Historique des commandes</h2>
        <div className="order-items-container">
          <OtherOrders
            orderHistory={orderHistory}
            getStepColor={getStepColor}
          />
          <DeliveredOrders
            orderHistory={orderHistory}
            getStepColor={getStepColor}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountClient;
