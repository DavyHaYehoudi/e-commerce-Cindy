import React, { useState } from "react";
import FreeShippingBanner from "../components/menu/FreeShippingBanner";
import HeaderWrapper from "./HeaderWrapper";
import ModalMenuSmart from "./ModalMenuSmart";

const Header = () => {
  const [isModalMenuSmartOpen, setModalMenuSmartOpen] = useState(false);
  const toggleModalMenuSmart = () => {
    setModalMenuSmartOpen(!isModalMenuSmartOpen);
  };
  return (
    <header role="banner">
      <FreeShippingBanner />
      <HeaderWrapper toggleModalMenuSmart={toggleModalMenuSmart} />
      <ModalMenuSmart
        isModalMenuSmartOpen={isModalMenuSmartOpen}
        toggleModalMenuSmart={toggleModalMenuSmart}
      />
    </header>
  );
};

export default Header;
