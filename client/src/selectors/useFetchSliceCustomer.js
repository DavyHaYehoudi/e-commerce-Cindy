import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProduct } from "../features/admin/productSlice";
import { fetchCustomer } from "../features/accountClient/customerSlice";
import { fetchMaterials } from "../features/admin/materialSlice";
import { fetchCollections } from "../features/admin/collectionSlice";
import { fetchTags } from "../features/admin/tagSlice";
import { fetchCategories } from "../features/admin/categorySlice";

const useFetchSliceCustomer = (clientId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (clientId) {
      dispatch(fetchProduct());
      dispatch(fetchMaterials());
      dispatch(fetchCollections());
      dispatch(fetchTags());
      dispatch(fetchCategories());
      dispatch(fetchCustomer(clientId));
    }
    return;
  }, [clientId, dispatch]);
};

export default useFetchSliceCustomer;
