import React, { useState } from "react";
import OtherOrders from "../components/accountUser/OtherOrders";
import DeliveredOrders from "../components/accountUser/DeliveredOrders";
import UserInfo from "../components/accountUser/UserInfo";
import { getStatusColor } from "../helpers/getStatusColor";
import { orderHistoryUser } from "../mocks/orderHistoryUser";
import { userInfo } from "../mocks/userInfo";

const AccountUser = () => {
  const [userData] = useState(userInfo);
  const [orderHistory] = useState(orderHistoryUser);

  return (
    <div className="user-profile-container">
      <UserInfo userData={userData} />
      <div className="order-history">
        <h2>Historique des commandes</h2>
        <div className="order-items-container">
          <OtherOrders
            orderHistory={orderHistory}
            getStatusColor={getStatusColor}
          />
          <DeliveredOrders
            orderHistory={orderHistory}
            getStatusColor={getStatusColor}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountUser;
