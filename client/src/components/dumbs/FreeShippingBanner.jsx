import React from 'react';
import { FaTruckMoving } from 'react-icons/fa'

const FreeShippingBanner = () => {
    return (
        <div id='freeShippingBanner'>
            <span><FaTruckMoving /></span>
            <p> Livraison offerte à partir de 50€ </p>
        </div>
    );
};

export default FreeShippingBanner;