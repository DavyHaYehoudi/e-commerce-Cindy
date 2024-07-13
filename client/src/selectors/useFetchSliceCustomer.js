import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProduct } from "../features/admin/productSlice";
import { fetchCustomer } from "../features/accountClient/customerSlice";
import { fetchMaterials } from "../features/admin/materialSlice";
import { fetchCollections } from "../features/admin/collectionSlice";
import { fetchTags } from "../features/admin/tagSlice";
import { fetchCategories } from "../features/admin/categorySlice";
import { fetchProductsFixed } from "../features/admin/productsFixedSlice";
import useUnauthorizedRedirect from "../services/errors/useUnauthorizedRedirect";

const useFetchSliceCustomer = (clientId) => {
  const dispatch = useDispatch();
  const handleUnauthorized = useUnauthorizedRedirect();

  const fetchSliceCustomer = useCallback(() => {
    if (clientId) {
      dispatch(fetchProduct());
      dispatch(fetchProductsFixed())
      dispatch(fetchMaterials());
      dispatch(fetchCollections());
      dispatch(fetchTags());
      dispatch(fetchCategories());
      dispatch(fetchCustomer({ clientId, handleUnauthorized }));
    }
  }, [clientId, dispatch, handleUnauthorized]);

  useEffect(() => {
    fetchSliceCustomer();
  }, [fetchSliceCustomer]);

  return fetchSliceCustomer;
};

export default useFetchSliceCustomer;
