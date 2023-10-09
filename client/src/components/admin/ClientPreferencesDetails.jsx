import React from 'react';
import WishlistUserViewAdmin from './WishlistUserViewAdmin';
import CartUserViewAdmin from './CartUserViewAdmin';

const ClientPreferencesDetails = ({ client }) => {
    return (
        <div>
            <div>
                Wishlist: {client.wishlist.map(item => (
                    <WishlistUserViewAdmin key={item.productId} item={item} />
                ))}
            </div>
            <div>
                Cart: {client.cart.map(item => (
                    <CartUserViewAdmin key={item.productId} item={item} />
                ))}
            </div>
        </div>
    );
};

export default ClientPreferencesDetails;
