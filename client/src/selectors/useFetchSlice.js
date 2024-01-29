import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "../features/admin/clientsSlice";
import { fetchOrders } from "../features/admin/ordersSlice";
import { fetchProducts } from "../features/admin/productsByOrderSlice";
import { fetchProduct } from "../features/admin/productSlice";
import { fetchCredits } from "../features/admin/creditSlice";
import { fetchCustomer } from "../features/accountClient/customerSlice";

const useFetchSlice = (slice, clientId) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state?.[slice]?.status);

  useEffect(() => {
    const fetchFunctionMap = {
      clients: fetchClients,
      orders: fetchOrders,
      productsByOrder: fetchProducts,
      product: fetchProduct,
      credit: fetchCredits,
      customer: fetchCustomer,
    };
    if (status === "idle") {
      dispatch(fetchFunctionMap[slice](clientId));
    }
  }, [status, dispatch, slice, clientId]);
};

export default useFetchSlice;
