import { useSelector } from "react-redux";
import { useEffect } from "react";

const useFilteredProducts = (updateMaterialCount) => {
  const productsStore = useSelector((state) => state?.product?.data);
  const checkedItems =
    useSelector((state) => state?.product?.checkedItemsFilter) || {};
  const productsCurrented = productsStore.filter(
    (product) => !product.isArchived && product.isActive
  );

  let materialCount = 0;
  productsCurrented.forEach((product) => {
    product.materials
      .filter((material) => material.isActive && !material.isArchived)
      .forEach(() => {
        materialCount += 1;
      });
  });

  useEffect(() => {
    updateMaterialCount(materialCount);
  }, [materialCount, updateMaterialCount]);

  const filterMaterials = (material) => {
    const today = new Date();

    if (
      checkedItems["En promotion"] &&
      (!material?.promotion?.endDate ||
        new Date(material.promotion.endDate) < today)
    ) {
      return false;
    }

    if (
      checkedItems["Nouveau"] &&
      (!material?.untilNew || new Date(material.untilNew) < today)
    ) {
      return false;
    }

    if (checkedItems["En vedette"] && !material?.isStar) {
      return false;
    }

    return material?.isActive && !material?.isArchived;
  };

  return { productsCurrented, filterMaterials };
};

export default useFilteredProducts;
