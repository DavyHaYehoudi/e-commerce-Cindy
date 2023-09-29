import React from 'react';
import { FaTruckMoving } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const FreeShippingBanner = () => {
    return (
        <div id='freeShippingBanner'>
            <Link to="deliveries&returns">
            <span><FaTruckMoving /></span>
            <p> Livraison offerte à partir de 50€ </p>
            </Link>
        </div>
    );
};

export default FreeShippingBanner;