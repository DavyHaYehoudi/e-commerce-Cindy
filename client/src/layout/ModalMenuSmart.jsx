import React from "react";
import { TfiClose } from "react-icons/tfi";
import NavMenu from "../components/menu/NavMenu";
import DarkMode from "../components/darkMode/DarkMode";
import NavIcons from "../components/menu/NavIcons";

const ModalMenuSmart = ({ toggleModalMenuSmart, isModalMenuSmartOpen }) => {
  return (
    <div className={`modalMenuSmart ${isModalMenuSmartOpen ? "show" : ""}`}>
      <NavMenu toggleModalMenuSmart={toggleModalMenuSmart} />
      <div className="darkmode">
        <DarkMode />
      </div>
      <NavIcons toggleModalMenuSmart={toggleModalMenuSmart} />
      <div className="close-btn" onClick={toggleModalMenuSmart}>
        <TfiClose />
      </div>
    </div>
  );
};

export default ModalMenuSmart;
