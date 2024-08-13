import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchSliceCustomer from "../../../selectors/useFetchSliceCustomer";
import useProfilChange from "./useProfilChange";
import {
  addRole,
  addToken,
} from "../../../features/authentication/authenticationSlice";
import { getOrderStepProperty } from "../../../helpers/constants/orderStep";
import { orderStep } from "../../../constants/orderStep";

const useAccountClient = () => {
  const [clientId, setClientId] = useState(null);
  useFetchSliceCustomer(clientId);

  const dispatch = useDispatch();

  const dataClient = useSelector((state) => state?.customer?.data?.client);
  const [selectedTab, setSelectedTab] = useState("Commandes");
  const orderHistory = useSelector((state) => state?.customer?.data?.orders);
  const giftcardStore =useSelector(state=>state?.customer?.data?.giftcard);
  const creditStore =useSelector(state=>state?.customer?.data?.credit);
  const giftcardCount = giftcardStore?.length;
  const creditCount = creditStore?.length;

  const otherOrdersCount = Array.isArray(orderHistory)
    ? orderHistory.filter((order) => {
        const orderStepName = getOrderStepProperty(order.step)?.name;
        const comparisonStepName = orderStep?.[2]?.name;
        return orderStepName !== comparisonStepName;
      }).length
    : 0;
  const deliveredOrdersCount = Array.isArray(orderHistory)
    ? orderHistory.filter((order) => {
        const orderStepName = getOrderStepProperty(order.step)?.name;
        const comparisonStepName = orderStep?.[2]?.name;
        return orderStepName === comparisonStepName;
      }).length
    : 0;
  const ordersCount = orderHistory?.length;

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const tokenParse = JSON.parse(atob(token.split(".")[1]));
    setClientId(tokenParse?.clientId);
    dispatch(addToken(token));
    dispatch(addRole(tokenParse?.role));
  }, [dispatch]);
  const {
    handleChangeProfilSave,
    isEditing,
    setIsEditing,
    setIsModified,
    isModified,
    handleChangeProfilEdit,
  } = useProfilChange();

  return {
    clientId,
    dataClient,
    selectedTab,
    handleTabChange,
    handleChangeProfilSave,
    isEditing,
    setIsEditing,
    setIsModified,
    isModified,
    handleChangeProfilEdit,
    otherOrdersCount,
    deliveredOrdersCount,
    ordersCount,
    giftcardCount,
    creditCount
  };
};

export default useAccountClient;
