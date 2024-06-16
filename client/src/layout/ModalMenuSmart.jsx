import React from "react";
import { TfiClose } from "react-icons/tfi";
import NavMenu from "../components/menu/NavMenu";
import DarkMode from "../components/darkMode/DarkMode";
import NavIcons from "../components/menu/NavIcons";

const ModalMenuSmart = ({ toggleModalMenuSmart, isModalMenuSmartOpen }) => {
  return (
    <div className={`modalMenuSmart ${isModalMenuSmartOpen ? "show" : ""}`}>
      <div className="top-block">
        <NavMenu toggleModalMenuSmart={toggleModalMenuSmart} />
      </div>
      <div className="bottom-block">
        <div className="darkmode">
          <DarkMode />
        </div>
        <NavIcons toggleModalMenuSmart={toggleModalMenuSmart} />
      </div>
      <div className="close-btn" onClick={toggleModalMenuSmart}>
        <TfiClose />
      </div>
    </div>
  );
};

export default ModalMenuSmart;
