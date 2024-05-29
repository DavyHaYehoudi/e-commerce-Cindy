import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const useMasterData = () => {
  const { collectionId } = useParams();

  const collectionsStore = useSelector((state) => state?.collection?.data);
  const collectionName = collectionsStore.find(
    (collection) => collection._id === collectionId
  )?.name;

  const categoriesStore = useSelector((state) => state?.category?.data);
  const categoriesLinkedToCollection = categoriesStore.filter(
    (category) =>
      category?.parentCollection.includes(collectionId) && !category?.isArchived
  );

  const productsStore = useSelector((state) => state?.product?.data);
  const productsLinkedToCollectionAndCategory = productsStore.filter(
    (product) =>
      product._collection === collectionId && product.isActive&&
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

  return {
    collectionName,
    categoriesLinkedToCollection,
    productsLinkedToCollectionAndCategory,
    productsNumber: totalMaterialsCount,
    collectionId,
  };
};

export default useMasterData;
