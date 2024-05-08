import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useClientFromToken from "../../authentication/hooks/useClientFromToken";
import useFetchSliceAdmin from "../../../selectors/useFetchSliceAdmin";
import { addToken } from "../../../features/authentication/authenticationSlice";

const useAdminDashboard = () => {
  const { role, token } = useClientFromToken() || "";
  const [clientDetails, setClientDetails] = useState({});
  const { itemsPerPage, setItemsPerPage } = useFetchSliceAdmin();
  const dispatch = useDispatch();
  const totalClientsCount = useSelector(
    (state) => state?.clients?.totalClientsCount
  );

  useEffect(() => {
    dispatch(addToken(token));
  }, [dispatch, token, itemsPerPage]);

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
