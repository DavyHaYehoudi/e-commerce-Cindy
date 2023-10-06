import React from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { FaMailBulk } from "react-icons/fa";

const WishlistModalActions = () => {
  const handleAddAllToCart = () => {
    alert("Tous les produits ont été ajoutés au panier avec succès !");
  };

  const handleCopyLink = (linkType, linkValue) => {
    navigator.clipboard
      .writeText(linkValue)
      .then(() => {
        alert(`Le ${linkType} a été copié avec succès !`);
      })
      .catch((error) => {
        console.error(`Erreur lors de la copie du ${linkType} :`, error);
        alert(
          `Une erreur s'est produite lors de la copie du ${linkType}. Veuillez réessayer.`
        );
      });
  };

  const handleEmailLink = () => {
    const emailLink = `mailto:?subject=Ma liste de favoris&body=Voici ma liste de favoris : ${window.location.href}`;
    window.location.href = emailLink;
  };

  const handleCopyUrlLink = () => {
    const wishlistUrl = window.location.href;
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
          <span onClick={handleEmailLink}>
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
    </>
  );
};

export default WishlistModalActions;
