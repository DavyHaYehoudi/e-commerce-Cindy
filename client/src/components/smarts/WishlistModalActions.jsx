import React from "react";
import { FaCartArrowDown, FaLink, FaMailBulk } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WishlistModalActions = () => {
  const wishlistUrl = window.location.href;

  const handleAddAllToCart = () => {
    toast.success("Tous les produits ont été ajoutés au panier avec succès !");
  };

  const handleCopyLink = (linkType, linkValue) => {
    navigator.clipboard
      .writeText(linkValue)
      .then(() => {
        toast.success(`Le ${linkType} a été copié avec succès !`);
      })
      .catch((error) => {
        console.error(`Erreur lors de la copie du ${linkType} :`, error);
        toast.error(
          `Une erreur s'est produite lors de la copie du ${linkType}. Veuillez réessayer.`
        );
      });
  };

  const handleCopyEmailLink = () => {
    const emailLink = `mailto:?subject=Ma liste de favoris&body=Voici ma liste de favoris : ${wishlistUrl}`;

    handleCopyLink("lien e-mail", emailLink);
    window.location.href = emailLink;
  };

  const handleCopyUrlLink = () => {
    handleCopyLink("lien URL", wishlistUrl);
  };

  return (
    <>
      <button onClick={handleAddAllToCart} className="btn">
        Tout ajouter au panier <FaCartArrowDown />
      </button>
      <div className="wishlist-share">
        <span>Partager</span>
        <div
          className="wishlist-share-email info-tooltip"
          aria-label="Partager la liste des favoris par mail"
        >
          <span onClick={handleCopyEmailLink}>
            <FaMailBulk className="wishlist-share-icon" />
          </span>
        </div>
        <div
          className="wishlist-share-link info-tooltip"
          aria-label="Copier le lien de la liste des favoris"
        >
          <span onClick={handleCopyUrlLink}>
            <FaLink className="wishlist-share-icon" />
          </span>
        </div>
      </div>
      <ToastContainer autoClose={2500} />
    </>
  );
};

export default WishlistModalActions;
