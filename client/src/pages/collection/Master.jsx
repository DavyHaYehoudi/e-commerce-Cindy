import React from "react";
import Summary from "./Summary";
import useMasterData from "./hooks/useMasterData";
import useAuthWrappers from "../../useAuthWrappers";
import useFetchData from "../../useFetchData";
import CartOffcanvas from "../MasterProduct/cartAccess";
import useFirebaseImage from "../../shared/hooks/useFirebaseImage";

const Master = () => {
  const { role: getRole, clientId: getClientId } = useAuthWrappers();
  const role = getRole();
  const clientId = getClientId();
  useFetchData({ role, clientId });
  const {
    collectionName,
    categoriesLinkedToCollection,
    productsNumber,
    collectionId,
    imageCollection,
  } = useMasterData();

  const { imageUrl } = useFirebaseImage(imageCollection);
  return (
    <div className="collection-master">
      <div className="animated-container">
        <div className="main-title">
          <h1 className="text-effect-1" >Collection : {collectionName}</h1>
            ({productsNumber} produit{productsNumber > 1 ? "s" : ""} ){" "}
        </div>
        <Summary
          categoriesLinkedToCollection={categoriesLinkedToCollection}
          collectionId={collectionId}
        />
      </div>
      <CartOffcanvas />
      <div
        className="background-collection-master"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
    </div>
  );
};

export default Master;
