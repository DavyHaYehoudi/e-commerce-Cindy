import React from "react";
import FreeShippingBanner from "../components/menu/FreeShippingBanner";
import HeaderWrapper from "./HeaderWrapper";

const Header = () => {
  return (
    <header role="banner" >
      <FreeShippingBanner />
      <HeaderWrapper />
    </header>
  );
};

export default Header;
