import React, { useEffect } from "react";
import useAuthWrappers from "../../useAuthWrappers";
import useFetchData from "../../useFetchData";
import CartOffcanvas from "../MasterProduct/cartAccess";

const Home = () => {
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
  }, []);
  return (
    <div>
      <h1>ACCUEIL</h1>
      <CartOffcanvas />
    </div>
  );
};

export default Home;
