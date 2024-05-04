import React from "react";
import FreeShippingBanner from "../components/menu/FreeShippingBanner";
import HeaderWrapper from "./HeaderWrapper";
// import useFetchSliceCustomer from "../selectors/useFetchSliceCustomer";

const Header = () => {
  // useFetchSliceCustomer("client","1mongoDb");
  return (
    <header role="banner" >
      <FreeShippingBanner />
      <HeaderWrapper />
    </header>
  );
};

export default Header;
