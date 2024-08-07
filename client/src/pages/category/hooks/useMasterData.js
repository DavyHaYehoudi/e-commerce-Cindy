import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const useMasterData = () => {
  const { categoryId } = useParams();

  const categoriesStore = useSelector((state) => state?.category?.data);
  const productsStoreFixed = useSelector((state) => state?.productsFixed?.data);
  const productsLinkedToCategory = productsStoreFixed.filter(
    (product) =>
      !product?.isArchived &&
      product.isActive &&
      product?.category === categoryId
  );
  const totalMaterialsCount = productsLinkedToCategory.reduce(
    (acc, product) => {
      const filteredMaterials = product.materials.filter(
        (material) => !material.isArchived && material.isActive
      );
      return acc + filteredMaterials.length;
    },
    0
  );
  const categoryName =
    categoriesStore.find((category) => category._id === categoryId)?.name || "";

  return {
    categoryName,
    productsLinkedToCategory,
    productsNumber: totalMaterialsCount,
  };
};

export default useMasterData;
