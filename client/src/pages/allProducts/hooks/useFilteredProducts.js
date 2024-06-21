import { useSelector } from "react-redux";
import { useEffect } from "react";

const useFilteredProducts = (updateMaterialCount) => {
  const productsStore = useSelector((state) => state?.product?.data);
  const checkedItems =
    useSelector((state) => state?.product?.checkedItemsFilter) || {};
  const productsCurrented = productsStore.filter(
    (product) => !product.isArchived && product.isActive
  );

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

  const filteredMaterials =
    productsCurrented
      ?.flatMap((product) => product.materials)
      ?.filter(filterMaterials) || [];
  const materialCount = filteredMaterials.length;

  useEffect(() => {
    updateMaterialCount(materialCount);
  }, [materialCount, updateMaterialCount]);

  return { productsCurrented, filterMaterials };
};

export default useFilteredProducts;
