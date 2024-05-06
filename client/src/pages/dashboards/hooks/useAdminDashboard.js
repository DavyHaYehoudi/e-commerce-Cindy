import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTokenExpiration from "../../authentication/hooks/useTokenExpiration";
import useClientFromToken from "../../authentication/hooks/useClientFromToken";
import useFetchSliceAdmin from "../../../selectors/useFetchSliceAdmin";
import { fetchClients } from "../../../features/admin/clientsSlice";
import { addToken } from "../../../features/authentication/authenticationSlice";

const useAdminDashboard = () => {
  useTokenExpiration();
  const { role, token } = useClientFromToken() || "";
  useFetchSliceAdmin(role);
  const [clientDetails, setClientDetails] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const dispatch = useDispatch();
  const totalClientsCount = useSelector(
    (state) => state?.clients?.totalClientsCount
  );

  useEffect(() => {
    if (token && role === "admin") {
      dispatch(fetchClients({ itemsPerPage }));
      dispatch(addToken(token));
    }
    return;
  }, [dispatch, itemsPerPage, role, token]);

  const handleChangeItemPerPage = (event) => {
    const selectedValue = event.target.value;
    setItemsPerPage(
      selectedValue === "TOUS" ? "all" : parseInt(selectedValue, 10)
    );
  };

  const handleClientClick = (clientId) => {
    setClientDetails((prevDetails) => ({
      ...prevDetails,
      [clientId]: !prevDetails[clientId],
    }));
  };

  return {
    role,
    totalClientsCount,
    itemsPerPage,
    clientDetails,
    handleChangeItemPerPage,
    handleClientClick,
  };
};

export default useAdminDashboard;
