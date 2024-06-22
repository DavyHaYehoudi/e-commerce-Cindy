import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useWishlistProductContent = (product) => {
  const productStore = useSelector((state) => state?.product?.data);
  const collectionStore = useSelector((state) => state?.collection?.data);
  const categoryStore = useSelector((state) => state?.category?.data);
  const tagStore = useSelector((state) => state?.tag?.data);
  const materialStore = useSelector((state) => state?.material?.data);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      productStore &&
      collectionStore &&
      categoryStore &&
      tagStore &&
      materialStore
    ) {
      setLoading(false);
    }
  }, [productStore, collectionStore, categoryStore, tagStore, materialStore]);

  return {
    loading,
    productStore,
    collectionStore,
    categoryStore,
    tagStore,
    materialStore,
  };
};

export default useWishlistProductContent;
