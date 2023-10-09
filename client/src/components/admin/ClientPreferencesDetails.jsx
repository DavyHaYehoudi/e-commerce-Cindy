import React from 'react';
import WishlistUserViewAdmin from './WishlistUserViewAdmin';
import CartUserViewAdmin from './CartUserViewAdmin';

const ClientPreferencesDetails = ({ client }) => {
    return (
        <div>
            <div>
                Sa liste de favoris 😉 : {client.wishlist.map(item => (
                    <WishlistUserViewAdmin key={item.productId} item={item} />
                ))}
            </div>
            <div>
                Son panier 🤫 : {client.cart.map(item => (
                    <CartUserViewAdmin key={item.productId} item={item} />
                ))}
            </div>
        </div>
    );
};

export default ClientPreferencesDetails;
