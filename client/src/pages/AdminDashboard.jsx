import React, { useState } from "react";
import List from "../components/admin/byClient/list";
import useFetchSlice from "../selectors/useFetchSlice";

const AdminDashboard = () => {
  const [clientDetails, setClientDetails] = useState({});
  useFetchSlice("clients");
  useFetchSlice("orders");
  useFetchSlice("productsByOrder");
  useFetchSlice("product");
  useFetchSlice("credit");

  // ouverture/fermeture rangée client
  const handleClientClick = (clientId) => {
    setClientDetails((prevDetails) => ({
      ...prevDetails,
      [clientId]: !prevDetails[clientId],
    }));
    // dispatch(orderActions({}))
  };

  return (
    <div className="admin-dashboard" data-testid="admin-dashboard">
      <List
        handleClientClick={handleClientClick}
        clientDetails={clientDetails}
      />
    </div>
  );
};

export default AdminDashboard;
