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
      <div
        onClick={handleAddAllToCart}
        className="info-tooltip"
        aria-label="Tout ajouter au panier"
      >
        <FaCartArrowDown className="wishlist-icon-actions" aria-hidden="true" />
      </div>
      <div
        onClick={handleCopyEmailLink}
        className="info-tooltip"
        aria-label="Partager la liste des favoris par mail"
      >
        <FaMailBulk className="wishlist-icon-actions" aria-hidden="true" />
      </div>
      <div
        onClick={handleCopyUrlLink}
        className="info-tooltip"
        aria-label="Copier le lien de la liste des favoris"
      >
        <FaLink className="wishlist-icon-actions" aria-hidden="true" />
      </div>
      <ToastContainer autoClose={2500} />
    </>
  );
};

export default WishlistModalActions;
