import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import List from "../components/admin/byClient/list";

const AdminDashboard = () => {
  const [clientDetails, setClientDetails] = useState({});
  const dispatch = useDispatch();

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
        handleClientClick={handleClientClick}
        clientDetails={clientDetails}
      />
    </div>
  );
};

export default AdminDashboard;
