import React, { useState } from "react";
import NavIcons from "../components/menu/NavIcons";
import NavMenu from "../components/menu/NavMenu";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import WishlistModal from "../components/wishlist/WishlistModal";
import { useSelector } from "react-redux";
import DarkMode from "../components/darkMode/DarkMode";
import useAuthWrappers from "../useAuthWrappers";

const HeaderWrapper = () => {
  const [isWishlistModalOpen, setWishlistModalOpen] = useState(false);
  const { clientId: getClientId } = useAuthWrappers();
  const clientId = getClientId();
  const wishlistClient = useSelector(
    (state) => state?.customer?.data?.client?.wishlist
  );
  const wishlistVisitor = useSelector(
    (state) => state?.visitUser?.wishlist || []
  );
  const wishlist = clientId ? wishlistClient : wishlistVisitor;
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
        <DarkMode />
        <h1>
          <Link to="/">
            <img src={logo} alt="logo" width="200px" />{" "}
          </Link>
        </h1>
        <div className="flex-item-navIcons">
          <NavIcons onClickHeart={handleOpenWishlistModal} />
        </div>
      </div>
      <div>
        <NavMenu />
      </div>

      <WishlistModal
        isOpen={isWishlistModalOpen}
        onClose={handleCloseWishlistModal}
        wishlist={wishlist}
        handleCloseWishlistModal={handleCloseWishlistModal}
      />
    </div>
  );
};

export default HeaderWrapper;
