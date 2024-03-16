import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "../features/admin/clientsSlice";
import { fetchProduct } from "../features/admin/productSlice";
import { fetchCustomer } from "../features/accountClient/customerSlice";
import { fetchMaterials } from "../features/admin/materialSlice";
import { fetchPromocode } from "../features/admin/promocodeSlice";

const useFetchSlice = (slice, clientId) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state?.[slice]?.status);

  useEffect(() => {
    const fetchFunctionMap = {
      clients: fetchClients,
      product: fetchProduct,
      material: fetchMaterials,
      promocode: fetchPromocode,
      customer: fetchCustomer,
    };
    if (status === "idle") {
      dispatch(fetchFunctionMap[slice](clientId));
    }
  }, [status, dispatch, slice, clientId]);
};

export default useFetchSlice;
