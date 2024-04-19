import { useEffect, useState } from "react";
import { ref, listAll, getMetadata } from "firebase/storage";
import { storage } from "../../../../firebase";

const useFetchStatsStorage = (paths) => {
  const [stats, setStats] = useState({ totalImages: 0, totalSize: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      let totalImages = 0;
      let totalSize = 0;

      for (const path of paths) {
        const listRef = ref(storage, path);
        try {
          const res = await listAll(listRef);
          totalImages += res.items.length;

          const promises = res.items.map((itemRef) => getMetadata(itemRef));
          const metadatas = await Promise.all(promises);

          totalSize += metadatas.reduce((acc, metadata) => {
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

      setStats({ totalImages, totalSize });
    };

    fetchStats();
  }, []);

  return stats;
};

export default useFetchStatsStorage;
