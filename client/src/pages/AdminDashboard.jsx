import React, { useState } from "react";
import List from "../components/admin/byClient/list";
import useFetchSlice from "../selectors/useFetchSlice";

const AdminDashboard = () => {
  const [clientDetails, setClientDetails] = useState({});
  useFetchSlice("clients");
  useFetchSlice("orders");
  useFetchSlice("products");
  useFetchSlice("product");
  useFetchSlice("credits");
  
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
