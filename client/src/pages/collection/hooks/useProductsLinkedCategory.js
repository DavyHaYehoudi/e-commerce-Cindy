import { useSelector } from "react-redux";

const useProductsLinkedCategory = ({ collectionId, categoryId }) => {
  const productsStore = useSelector((state) => state?.product?.data);
  const productsLinked = productsStore.filter(
    (product) =>
      product._collection === collectionId &&
      product.category === categoryId &&
      product.isActive
  );

  const totalMaterialsCount = productsLinked.reduce((acc, product) => {
    const filteredMaterials = product.materials.filter(
      (material) => !material.isArchived && material.isActive
    );
    return acc + filteredMaterials.length;
  }, 0);
  return { productsLinked, productsNumber: totalMaterialsCount };
};

export default useProductsLinkedCategory;
