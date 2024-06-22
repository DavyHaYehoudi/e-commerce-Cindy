import React from "react";
import { useSelector } from "react-redux";
import CardCollection from "./CardCollection";
import CartOffcanvas from "../MasterProduct/cartAccess";

const Collections = () => {
  const collectionsStore = useSelector((state) => state?.collection?.data);
  return (
    <div className="collections-ui">
      <div className="animated-container">
        <h1 className="text-effect-1">TOUTES LES COLLECTIONS</h1>
        <div className="collections-wrapper-ui">
          {collectionsStore &&
            collectionsStore.length > 0 &&
            collectionsStore
              .filter((collection) => !collection?.isArchived)
              .map((collection) => (
                <CardCollection collection={collection} key={collection?._id} />
              ))}
        </div>
      </div>
      <CartOffcanvas />
    </div>
  );
};

export default Collections;
