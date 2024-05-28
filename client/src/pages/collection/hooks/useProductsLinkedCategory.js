import { useSelector } from "react-redux";

const useProductsLinkedCategory = ({ collectionId, categoryId }) => {
  const productsStore = useSelector((state) => state?.product?.data);
  const productsLinked = productsStore.filter(
    (product) =>
      product._collection === collectionId && product.category === categoryId
  );
  const totalMaterialsCount = productsLinked.reduce((acc, product) => {
    return acc + (product.materials ? product.materials.length : 0);
  }, 0);
  return { productsLinked, productsNumber: totalMaterialsCount };
};
export default useProductsLinkedCategory;
