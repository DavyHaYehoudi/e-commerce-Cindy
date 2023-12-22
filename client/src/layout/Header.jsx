import React from "react";
import FreeShippingBanner from "../components/menu/FreeShippingBanner";
import HeaderWrapper from "./HeaderWrapper";
import useFetchSlice from "../selectors/useFetchSlice";

const Header = () => {
  useFetchSlice("client","1mongoDb");
  return (
    <header role="banner" >
      <FreeShippingBanner />
      <HeaderWrapper />
    </header>
  );
};

export default Header;
