import React from "react";
import FreeShippingBanner from "../components/menu/FreeShippingBanner";
import HeaderWrapper from "./HeaderWrapper";

const Header = () => {
  return (
    <header>
      <FreeShippingBanner />
      <HeaderWrapper />
    </header>
  );
};

export default Header;
