import React from "react"
import { Link } from "react-router-dom";


const formatForURL = (text) => {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
  };
  
  const MegaMenuItem = ({ category, subcategories }) => (
    <div>
      <h3>
        <Link to={`menu-tab-categories/${formatForURL(category)}`}>{category}</Link>
      </h3>
      <div>
        <ul>
          {subcategories.map((subcategory) => (
            <li key={subcategory}>
              <Link to={`menu-tab-subcategory/${formatForURL(subcategory)}`}>
                {subcategory}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
  export default MegaMenuItem;
  