import { useEffect, useState } from "react";
import { ref, listAll, getMetadata } from "firebase/storage";
import { storage } from "../../../../../firebase";

const useFetchStatsStorage = (pathsProducts, pathAvatars) => {
  const [statsProducts, setStatsProducts] = useState({
    totalImagesProducts: 0,
    totalSizeProducts: 0,
  });
  const [statsAvatars, setStatsAvatars] = useState({
    totalImagesAvatars: 0,
    totalSizeAvatars: 0,
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
    };

    fetchStats();
  }, [pathsProducts, pathAvatars]);

  return { statsProducts, statsAvatars };
};

export default useFetchStatsStorage;
