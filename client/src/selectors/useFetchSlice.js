import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "../features/admin/clientsSlice";
import { fetchOrders } from "../features/admin/ordersSlice";
import { fetchProducts } from "../features/admin/productsSlice";
import { fetchProduct } from "../features/admin/productSlice";
import { fetchCredits } from "../features/admin/creditsSlice";
import { fetchClient } from "../features/accountClient/clientSlice";

const useFetchSlice = (slice, clientId) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state?.[slice]?.status);

  useEffect(() => {
    const fetchFunctionMap = {
      clients: fetchClients,
      orders: fetchOrders,
      products: fetchProducts,
      product: fetchProduct,
      credits: fetchCredits,
      client: fetchClient,
    };
    if (status === "idle") {
      dispatch(fetchFunctionMap[slice](clientId));
    }
  }, [status, dispatch, slice, clientId]);
};

export default useFetchSlice;
