import React from "react";
import { useSelector } from "react-redux";
import CardCollection from "./CardCollection";
import useAuthWrappers from "../../useAuthWrappers";
import useFetchData from "../../useFetchData";

const Collections = () => {
  const collections = useSelector((state) => state?.collection?.data);
  const { role: getRole } = useAuthWrappers();
  const role = getRole();
  useFetchData(role);
  return (
    <div className="collections-ui">
      <h1>TOUTES LES COLLECTIONS</h1>
      <div className="collections-wrapper-ui">
        {collections &&
          collections.length > 0 &&
          collections
            .filter((collection) => !collection?.isArchived)
            .map((collection) => (
              <CardCollection collection={collection} key={collection?._id} />
            ))}
      </div>
    </div>
  );
};

export default Collections;
