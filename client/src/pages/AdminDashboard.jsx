import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "../components/admin/byClient/list";

const AdminDashboard = () => {
  const [clientDetails, setClientDetails] = useState({});
  const dispatch = useDispatch();
  const clientsStore = useSelector((state) => state.clients);
  const ordersStore = useSelector((state) => state.orders);
  const productsStore = useSelector((state) => state.products);

  useEffect(() => {
    // charger les clients depuis une API ici
    // dispatch(fetchClients());
  }, [dispatch]);

  // ouverture/fermeture rangée client
  const handleClientClick = (clientId) => {
    setClientDetails((prevDetails) => ({
      ...prevDetails,
      [clientId]: !prevDetails[clientId],
    }));
    // dispatch(orderActions({}))
  };

  return (
    <div className="admin-dashboard">
      <List
        clientsStore={clientsStore}
        ordersStore={ordersStore}
        productsStore={productsStore}
        handleClientClick={handleClientClick}
        clientDetails={clientDetails}
      />
    </div>
  );
};

export default AdminDashboard;
