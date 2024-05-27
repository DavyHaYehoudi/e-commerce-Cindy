import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProduct } from "./features/admin/productSlice";
import { fetchMaterials } from "./features/admin/materialSlice";
import { fetchCollections } from "./features/admin/collectionSlice";
import { fetchTags } from "./features/admin/tagSlice";
import { fetchCategories } from "./features/admin/categorySlice";

const useFetchData = (role) => {
  const dispatch = useDispatch();

  const fetchSliceCustomer = useCallback(() => {
    dispatch(fetchProduct());
    dispatch(fetchMaterials());
    dispatch(fetchCollections());
    dispatch(fetchTags());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!role) {
      fetchSliceCustomer();
    }
  }, [fetchSliceCustomer, role]);

  return fetchSliceCustomer;
};

export default useFetchData;
