import React from 'react';
import { useParams } from 'react-router-dom';

const SubCategory = () => {
    const{subcategory}=useParams()
    return (
        <div>
            SubCategory :{subcategory}
        </div>
    );
};

export default SubCategory;