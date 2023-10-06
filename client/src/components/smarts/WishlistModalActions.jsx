import React from 'react';

const WishlistModalActions = () => {

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
        <>
          <button onClick={handleAddAllToCart}>Tout ajouter au panier</button>
            <button onClick={handleCopyEmailLink}>
              Envoyer le lien par e-mail
            </button>
            <button onClick={handleCopyUrlLink}>Copier le lien</button>  
        </>
    );
};

export default WishlistModalActions;