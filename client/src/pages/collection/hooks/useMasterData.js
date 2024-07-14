import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const useMasterData = () => {
  const { collectionId } = useParams();
  const productsStoreFixed = useSelector((state) => state?.productsFixed?.data);
  const collectionsStore = useSelector((state) => state?.collection?.data);
  const collectionName = collectionsStore.find(
    (collection) => collection._id === collectionId
  )?.name;

  const categoriesStore = useSelector((state) => state?.category?.data);
  const categoriesLinkedToCollection = categoriesStore.filter(
    (category) =>
      category?.parentCollection.includes(collectionId) && !category?.isArchived
  );

  const productsLinkedToCollectionAndCategory = productsStoreFixed.filter(
    (product) =>
      product._collection === collectionId &&
      product.isActive &&
      categoriesLinkedToCollection.some(
        (category) => category._id === product.category
      )
  );
  const totalMaterialsCount = productsLinkedToCollectionAndCategory.reduce(
    (acc, product) => {
      const filteredMaterials = product.materials.filter(
        (material) => !material.isArchived && material.isActive
      );
      return acc + filteredMaterials.length;
    },
    0
  );
  const imageCollection =
    collectionsStore.find((collection) => collection._id === collectionId)
      ?.main_image || "";

  return {
    collectionName,
    categoriesLinkedToCollection,
    productsLinkedToCollectionAndCategory,
    productsNumber: totalMaterialsCount,
    collectionId,
    imageCollection,
  };
};

export default useMasterData;
