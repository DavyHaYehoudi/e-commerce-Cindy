import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const WishlistModal = ({ isOpen, onClose, favoriteProducts }) => {
  const handleAddToCart = (productId) => {
    // Logique pour ajouter le produit au panier
    console.log(`Ajouter au panier : ${productId}`);
  };
  const handleAddAllToCart = () => {
    console.log("handleAddAllToCart:");
  };

  const handleCopyEmailLink = () => {
    const emailLink =
      "mailto:?subject=Ma liste de favoris&body=Voici ma liste de favoris : [insérer le lien ici]";
    navigator.clipboard.writeText(emailLink);
    // Message de confirmation ?
  };

  const handleCopyUrlLink = () => {
    const wishlistUrl = "[insérer le lien de la liste de favoris ici]";
    navigator.clipboard.writeText(wishlistUrl);
    // Message de confirmation ?
  };

  return (
    <div className={`wishlist-modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="wishlist-modal-content">
            {/* Contenu de la modale ici */}
            <h2>Ma liste de favoris</h2>
            <button onClick={onClose}>
              Fermer <AiOutlineClose />
            </button>
          </div>
        </div>
        <div className="modal-body">
          {/* Afficher la liste des produits favoris */}
          {/* {favoriteProducts.map((product) => (
            <div key={product.id} className="product-row">
              <img src={product.image} alt={product.title} />
              <div>
                <h3>{product.title}</h3>
                <div className="product-actions">
                  <button onClick={() => handleAddToCart(product.id)}>Ajouter au panier</button>
                  <button>Retirer des favoris</button>
                </div>
              </div>
            </div>
          ))} */}
        </div>
        <div className="modal-footer">
          <button onClick={handleAddAllToCart}>Ajouter tous au panier</button>
          <button onClick={handleCopyEmailLink}>
            Copier le lien par e-mail
          </button>
          <button onClick={handleCopyUrlLink}>Copier le lien URL</button>
        </div>
      </div>
    </div>
  );
};

export default WishlistModal;
