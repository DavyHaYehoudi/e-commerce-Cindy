import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClientList from "../components/admin/clientList/ClientList";
import { handleOrderStatusChange } from "../features/orderStatusSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.ordersStatus);
  const [clientDetails, setClientDetails] = useState({});

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
    dispatch(handleOrderStatusChange({}))
  };

  return (
    <div className="admin-dashboard">
      <ClientList
        clients={clients}
        handleClientClick={handleClientClick}
        clientDetails={clientDetails}
      />
    </div>
  );
};

export default AdminDashboard;
