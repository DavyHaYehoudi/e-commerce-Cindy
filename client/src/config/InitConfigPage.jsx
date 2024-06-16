import React, { useEffect } from "react";
import useAuthWrappers from "./useAuthWrappers";
import useFetchData from "./useFetchData";


const InitConfigPage = ({ children }) => {
  const { role: getRole, clientId: getClientId } = useAuthWrappers();
  const role = getRole();
  const clientId = getClientId();

  useFetchData({ role, clientId });

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    scrollToTop();
  }, [children]);


  return <>
  {children}
  </>;
};

export default InitConfigPage;
