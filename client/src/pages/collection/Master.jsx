import React from "react";
import Summary from "./Summary";
import useMasterData from "./hooks/useMasterData";
import useAuthWrappers from "../../useAuthWrappers";
import useFetchData from "../../useFetchData";

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
  } = useMasterData();

  return (
    <div className="collection-master">
      <div className="title">
        <h1>Collection : {collectionName}</h1>
        <small>
          ({productsNumber} produit{productsNumber > 1 ? "s" : ""} ){" "}
        </small>
      </div>
      <Summary
        categoriesLinkedToCollection={categoriesLinkedToCollection}
        collectionId={collectionId}
      />
    </div>
  );
};

export default Master;
