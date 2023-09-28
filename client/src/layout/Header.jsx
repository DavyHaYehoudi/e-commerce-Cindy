import React from "react";
import FreeShippingBanner from "../components/dumbs/FreeShippingBanner";
import HeaderWrapper from "./HeaderWrapper";

const Header = () => {
  return (
    <header>
      <FreeShippingBanner />
      <HeaderWrapper />
      <hr/>
    </header>
  );
};

export default Header;
