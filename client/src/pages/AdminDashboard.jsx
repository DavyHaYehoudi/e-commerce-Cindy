import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "../features/admin/clientsSlice";
import Menu from "../components/admin";
import useTokenExpiration from "./authentication/hooks/useTokenExpiration";
import useFetchSliceAdmin from "../selectors/useFetchSliceAdmin";
import useClientFromToken from "./authentication/hooks/useClientFromToken";

const AdminDashboard = () => {
  useTokenExpiration();
  const { role } = useClientFromToken() || "";
  useFetchSliceAdmin(role);
  const [clientDetails, setClientDetails] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const dispatch = useDispatch();
  const totalClientsCount = useSelector(
    (state) => state?.clients?.totalClientsCount
  );

  useEffect(() => {
    if (role === "admin") {
      dispatch(fetchClients({ itemsPerPage }));
    }
    return;
  }, [dispatch, itemsPerPage, role]);

  const handleChangeItemPerPage = (event) => {
    const selectedValue = event.target.value;
    setItemsPerPage(
      selectedValue === "TOUS" ? "all" : parseInt(selectedValue, 10)
    );
  };

  // ouverture/fermeture rangée client
  const handleClientClick = (clientId) => {
    setClientDetails((prevDetails) => ({
      ...prevDetails,
      [clientId]: !prevDetails[clientId],
    }));
  };

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
