import React from "react";
import Menu from "./admin"
import useAdminDashboard from "./hooks/useAdminDashboard";

const AdminDashboard = () => {
  const {
    totalClientsCount,
    itemsPerPage,
    clientDetails,
    handleChangeItemPerPage,
    handleClientClick,
  } = useAdminDashboard();
  return (
    <div className="admin-dashboard" data-testid="admin-dashboard">
      <Menu
        totalClientsCount={totalClientsCount}
        itemsPerPage={itemsPerPage}
        handleChangeItemPerPage={handleChangeItemPerPage}
        handleClientClick={handleClientClick}
        clientDetails={clientDetails}
      />
    </div>
  );
};

export default AdminDashboard;
