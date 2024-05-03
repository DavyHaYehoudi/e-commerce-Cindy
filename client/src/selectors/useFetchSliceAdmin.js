import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchClients } from "../features/admin/clientsSlice";
import { fetchProduct } from "../features/admin/productSlice";
import { fetchMaterials } from "../features/admin/materialSlice";
import { fetchPromocode } from "../features/admin/promocodeSlice";
import { fetchCollections } from "../features/admin/collectionSlice";
import { fetchTags } from "../features/admin/tagSlice";
import { fetchCategories } from "../features/admin/categorySlice";

const useFetchSliceAdmin = (role) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (role === "admin") {
      dispatch(fetchClients());
      dispatch(fetchProduct());
      dispatch(fetchMaterials());
      dispatch(fetchPromocode());
      dispatch(fetchCollections());
      dispatch(fetchCategories());
      dispatch(fetchTags());
    }
    return;
  }, [dispatch, role]);
};

export default useFetchSliceAdmin;
