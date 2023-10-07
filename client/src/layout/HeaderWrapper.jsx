import React, { useState } from "react";
import Langs from "../components/smarts/Langs";
import NavIcons from "../components/smarts/NavIcons";
import NavMenu from "../components/smarts/NavMenu";
import { Link } from "react-router-dom";
import MegaMenu from "../components/smarts/MegaMenu";
import logo from "../assets/logo.png";
import WishlistModal from "../components/smarts/WishlistModal";

const HeaderWrapper = () => {
  const [megaMenuSection, setMegaMenuSection] = useState(null);
  const [isWishlistModalOpen, setWishlistModalOpen] = useState(false);

  const handleMenuEnter = (section) => {
    setMegaMenuSection(section);
  };

  const handleMenuLeave = () => {
    setMegaMenuSection(null);
  };

  const handleOpenWishlistModal = () => {
    setWishlistModalOpen(true);
  };

  const handleCloseWishlistModal = () => {
    if (isWishlistModalOpen) {
      setWishlistModalOpen(false);
    }
  };

  return (
    <div id="headerWrapper" onClick={handleCloseWishlistModal}>
      <div id="flex-item">
        <Langs />
        <h1>
          <Link to="/">
            <img src={logo} alt="logo" width="200px" />{" "}
          </Link>
        </h1>
        <div>
          <NavIcons onClickHeart={handleOpenWishlistModal} />
        </div>
      </div>
      <div onMouseLeave={handleMenuLeave}>
        <NavMenu
          handleMenuEnter={handleMenuEnter}
          handleMenuLeave={handleMenuLeave}
        />

        <MegaMenu
          megaMenuSection={megaMenuSection}
          handleMenuEnter={handleMenuEnter}
        />
      </div>

      <WishlistModal
        isOpen={isWishlistModalOpen}
        onClose={handleCloseWishlistModal}
        // favoriteProducts={/* Passer votre liste de produits favoris ici */}
      />
    </div>
  );
};

export default HeaderWrapper;
