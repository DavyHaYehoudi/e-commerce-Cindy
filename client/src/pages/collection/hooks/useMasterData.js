import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const useMasterData = () => {
  const { collectionId } = useParams();

  const collections = useSelector((state) => state?.collection?.data);
  const collectionName = collections.find(
    (collection) => collection._id === collectionId
  )?.name;

  const categories = useSelector((state) => state?.category?.data);
  const categoriesLinkedToCollection = categories.filter((category) =>
    category?.parentCollection.includes(collectionId)
  );

  const products = useSelector((state) => state?.product?.data);
  const productsLinkedToCollectionAndCategory = products.filter(
    (product) =>
      product._collection === collectionId &&
      categoriesLinkedToCollection.some(
        (category) => category._id === product.category
      )
  );

  return {
    collectionName,
    categoriesLinkedToCollection,
    productsLinkedToCollectionAndCategory,
  };
};

export default useMasterData;
