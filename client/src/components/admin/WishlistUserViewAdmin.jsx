import React from 'react';

const WishlistUserViewAdmin = ({ item }) => {
    return (
        <div>
            <p>Product ID: {item.productId}</p>
            <p>Name: {item.name}</p>
            <p>Material: {item.material}</p>
            <p>Price: {item.price}</p>
            <img src={item.image} alt={item.name} />
        </div>
    );
};

export default WishlistUserViewAdmin;
