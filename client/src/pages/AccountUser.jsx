import React, { useState } from "react";
import OtherOrders from "../components/accountUser/OtherOrders";
import DeliveredOrders from "../components/accountUser/DeliveredOrders";
import UserInfo from "../components/accountUser/UserInfo";
import { getStatusColor } from "../helpers/getStatusColor";

const AccountUser = () => {
  const [userData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    address: "123 Main St, City, Country",
  });

  const [orderHistory] = useState([
    { id: 1, date: "2023-01-15 08:30", status: "En attente" },
    { id: 2, date: "2023-02-02 14:45", status: "En cours de préparation" },
    { id: 3, date: "2023-03-10 10:20", status: "Expédiée" },
    { id: 4, date: "2023-03-20 18:15", status: "En cours de préparation" },
    { id: 5, date: "2023-04-05 09:55", status: "Expédiée" },
  ]);

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
