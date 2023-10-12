import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClientList from "../components/admin/clientList/ClientList";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.ordersStatus);
  const [clientDetails, setClientDetails] = useState({});

  useEffect(() => {
    // charger les clients depuis une API ici
    // dispatch(fetchClients());
  }, [dispatch]);

  const handleClientClick = (clientId) => {
    setClientDetails((prevDetails) => ({
      ...prevDetails,
      [clientId]: !prevDetails[clientId],
    }));
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
