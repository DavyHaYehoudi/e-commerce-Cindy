import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useAuthWrappers from "../../../useAuthWrappers";
import useFetchData from "../../../useFetchData";
import {
  fetchProduct,
  showCartAccess,
} from "../../../features/admin/productSlice";

const useAllProductsPage = () => {
  const [searchBarValue, setSearchBarValue] = useState("");
  const [materialCount, setMaterialCount] = useState(0);
  const dispatch = useDispatch();

  const updateMaterialCount = (count) => {
    setMaterialCount(count);
  };

  const { role: getRole, clientId: getClientId } = useAuthWrappers();
  const role = getRole();
  const clientId = getClientId();

  useFetchData({ role, clientId });

  const handleSearchChange = (e) => {
    const name = e.target.value;
    setSearchBarValue(name);
    if (name.length > 2) {
      dispatch(fetchProduct({ name }));
    } else {
      dispatch(fetchProduct());
    }
  };
  useEffect(() => {
    dispatch(showCartAccess(false));
  }, [dispatch]);
  return {
    searchBarValue,
    setSearchBarValue,
    materialCount,
    updateMaterialCount,
    handleSearchChange,
  };
};

export default useAllProductsPage;
