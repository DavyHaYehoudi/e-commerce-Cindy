import React from "react";
import NavIcons from "../components/menu/NavIcons";
import NavMenu from "../components/menu/NavMenu";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import WishlistModal from "../components/wishlist/WishlistModal";
import DarkMode from "../components/darkMode/DarkMode";
import useStoreInfo from "../shared/hooks/useStoreInfo";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { showWishlistAccess } from "../features/admin/productSlice";

const HeaderWrapper = ({ toggleModalMenuSmart }) => {
  const wishlistAccess = useSelector((state) => state?.product?.wishlistAccess);
  const { wishlist } = useStoreInfo({ productsId: "", material: "" });
  const dispatch = useDispatch();
  const handleCloseWishlistModal = () => {
    dispatch(showWishlistAccess(false));
  };

  return (
    <div id="headerWrapper">
      <div id="flex-item">
        <div className="flex-item-left">
          <span
            className="smart-screen hamburger"
            onClick={toggleModalMenuSmart}
          >
            {" "}
            <GiHamburgerMenu />
          </span>
          <span className="darkmode" onClick={toggleModalMenuSmart}>
            {" "}
            <DarkMode />
          </span>
        </div>
        <h1 className="flex-item-center">
          <Link to="/">
            <img src={logo} alt="logo" width="200px" />{" "}
          </Link>
        </h1>
        <div className="flex-item-navIcons flex-item-right">
          <NavIcons />
        </div>
      </div>
      <div>
        <NavMenu />
      </div>

      <WishlistModal
        isOpen={wishlistAccess}
        onClose={handleCloseWishlistModal}
        wishlist={wishlist}
      />
    </div>
  );
};

export default HeaderWrapper;
