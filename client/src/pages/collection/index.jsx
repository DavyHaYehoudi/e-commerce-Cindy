import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CardCollection from "./CardCollection";
import useAuthWrappers from "../../useAuthWrappers";
import useFetchData from "../../useFetchData";

const Collections = () => {
  const collectionsStore = useSelector((state) => state?.collection?.data);
  const { role: getRole, clientId: getClientId } = useAuthWrappers();
  const role = getRole();
  const clientId = getClientId();
  useFetchData({ role, clientId });
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    scrollToTop();
  }, []);
  return (
    <div className="collections-ui">
      <h1 className="text-effect-1" >TOUTES LES COLLECTIONS</h1>
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
  );
};

export default Collections;
