import { useEffect, useState } from "react";
import { ref, listAll, getMetadata } from "firebase/storage";
import { storage } from "../../../../../firebase";

const useFetchStatsStorage = (
  pathsProducts,
  pathAvatars,
  pathCollections,
  pathCategories
) => {
  const [statsProducts, setStatsProducts] = useState({
    totalImagesProducts: 0,
    totalSizeProducts: 0,
  });
  const [statsAvatars, setStatsAvatars] = useState({
    totalImagesAvatars: 0,
    totalSizeAvatars: 0,
  });
  const [statsCollections, setStatsCollections] = useState({
    totalImagesCollections: 0,
    totalSizeCollections: 0,
  });
  const [statsCategories, setStatsCategories] = useState({
    totalImagesCategories: 0,
    totalSizeCollections: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      let totalImagesProducts = 0;
      let totalSizeProducts = 0;

      // Calculer les stats pour les produits
      for (const path of pathsProducts) {
        const listRef = ref(storage, path);
        try {
          const res = await listAll(listRef);
          totalImagesProducts += res.items.length;

          const promises = res.items.map((itemRef) => getMetadata(itemRef));
          const metadatas = await Promise.all(promises);

          totalSizeProducts += metadatas.reduce((acc, metadata) => {
            return acc + metadata.size;
          }, 0);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des données pour le chemin",
            path,
            ":",
            error
          );
        }
      }

      setStatsProducts({ totalImagesProducts, totalSizeProducts });

      // Calculer les stats pour les avatars
      const avatarRef = ref(storage, pathAvatars);
      try {
        const avatarRes = await listAll(avatarRef);
        const totalImagesAvatars = avatarRes.items.length;

        const avatarPromises = avatarRes.items.map((itemRef) =>
          getMetadata(itemRef)
        );
        const avatarMetadatas = await Promise.all(avatarPromises);

        const totalSizeAvatars = avatarMetadatas.reduce((acc, metadata) => {
          return acc + metadata.size;
        }, 0);

        setStatsAvatars({ totalImagesAvatars, totalSizeAvatars });
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données pour le chemin des avatars",
          pathAvatars,
          ":",
          error
        );
      }
      // Calculer les stats pour les collections
      const collectionRef = ref(storage, pathCollections);
      try {
        const collectionRes = await listAll(collectionRef);
        const totalImagesCollections = collectionRes.items.length;

        const collectionPromises = collectionRes.items.map((itemRef) =>
          getMetadata(itemRef)
        );
        const collectionMetadatas = await Promise.all(collectionPromises);

        const totalSizeCollections = collectionMetadatas.reduce(
          (acc, metadata) => {
            return acc + metadata.size;
          },
          0
        );

        setStatsCollections({ totalImagesCollections, totalSizeCollections });
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données pour le chemin des collections",
          pathCollections,
          ":",
          error
        );
      }
      // Calculer les stats pour les catégories
      const categoryRef = ref(storage, pathCategories);
      try {
        const categoryRes = await listAll(categoryRef);
        const totalImagesCategories = categoryRes.items.length;

        const categoryPromises = categoryRes.items.map((itemRef) =>
          getMetadata(itemRef)
        );
        const categoryMetadatas = await Promise.all(categoryPromises);

        const totalSizeCategories = categoryMetadatas.reduce(
          (acc, metadata) => {
            return acc + metadata.size;
          },
          0
        );

        setStatsCategories({ totalImagesCategories, totalSizeCategories });
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données pour le chemin des collections",
          pathCollections,
          ":",
          error
        );
      }
    };

    fetchStats();
  }, [pathsProducts, pathAvatars, pathCollections, pathCategories]);

  return { statsProducts, statsAvatars, statsCollections, statsCategories };
};

export default useFetchStatsStorage;
