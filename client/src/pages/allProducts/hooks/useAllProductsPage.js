import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
