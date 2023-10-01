import React from 'react';
import { MdOutlineLocalShipping } from 'react-icons/md'
import { Link } from 'react-router-dom';

const FreeShippingBanner = () => {
    return (
        <div id='freeShippingBanner'>
            <Link to="deliveries&returns">
            <span><MdOutlineLocalShipping /></span>
            <p> Livraison offerte à partir de 50€ </p>
            </Link>
        </div>
    );
};

export default FreeShippingBanner;