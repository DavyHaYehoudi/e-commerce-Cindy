import React, { useState } from "react";
import Langs from "../components/menu/Langs";
import NavIcons from "../components/menu/NavIcons";
import NavMenu from "../components/menu/NavMenu";
import { Link } from "react-router-dom";
import MegaMenu from "../components/menu/MegaMenu";
import logo from "../assets/logo.png";
import WishlistModal from "../components/wishlist/WishlistModal";
import { useSelector } from "react-redux";

const HeaderWrapper = () => {
  const [megaMenuSection, setMegaMenuSection] = useState(null);
  const [isWishlistModalOpen, setWishlistModalOpen] = useState(false);
  const favoriteProducts = useSelector(
    (state) => state?.client?.data?.client?.wishlist
  );

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
        favoriteProducts={favoriteProducts}
      />
    </div>
  );
};

export default HeaderWrapper;
