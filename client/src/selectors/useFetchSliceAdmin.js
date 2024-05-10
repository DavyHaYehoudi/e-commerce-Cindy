import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchClients } from "../features/admin/clientsSlice";
import { fetchProduct } from "../features/admin/productSlice";
import { fetchMaterials } from "../features/admin/materialSlice";
import { fetchPromocode } from "../features/admin/promocodeSlice";
import { fetchCollections } from "../features/admin/collectionSlice";
import { fetchTags } from "../features/admin/tagSlice";
import { fetchCategories } from "../features/admin/categorySlice";
import useUnauthorizedRedirect from "../services/errors/useUnauthorizedRedirect";

const useFetchSliceAdmin = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const dispatch = useDispatch();
  const handleUnauthorized = useUnauthorizedRedirect();

  const fetchSliceAdmin = useCallback(() => {
    dispatch(fetchClients({ itemsPerPage, handleUnauthorized }));
    dispatch(fetchProduct());
    dispatch(fetchMaterials());
    dispatch(fetchPromocode({ handleUnauthorized }));
    dispatch(fetchCollections());
    dispatch(fetchCategories());
    dispatch(fetchTags());
  }, [dispatch, itemsPerPage, handleUnauthorized]);

  useEffect(() => {
    fetchSliceAdmin();
  }, [fetchSliceAdmin]);

  return { itemsPerPage, setItemsPerPage };
};

export default useFetchSliceAdmin;
