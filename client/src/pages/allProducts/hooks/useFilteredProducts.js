import { useSelector } from "react-redux";
import { useEffect } from "react";

const useFilteredProducts = (updateMaterialCount) => {
  const productsStore = useSelector((state) => state?.product?.data);
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

  return productsCurrented;
};

export default useFilteredProducts;
