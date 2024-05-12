import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchSliceAdmin from "../../../selectors/useFetchSliceAdmin";
import { addRole, addToken } from "../../../features/authentication/authenticationSlice";

const useAdminDashboard = () => {
  const [clientDetails, setClientDetails] = useState({});
  const { itemsPerPage, setItemsPerPage } = useFetchSliceAdmin();
  const totalClientsCount = useSelector(
    (state) => state?.clients?.totalClientsCount
  );
  const dispatch = useDispatch();

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
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const tokenParse = JSON.parse(atob(token.split(".")[1]));
    dispatch(addToken(token));
    dispatch(addRole(tokenParse?.role))
  }, [dispatch]);

  return {
    totalClientsCount,
    itemsPerPage,
    clientDetails,
    handleChangeItemPerPage,
    handleClientClick,
  };
};

export default useAdminDashboard;
