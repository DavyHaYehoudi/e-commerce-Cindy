// hooks/useAssortedProducts.js
import { useSelector } from "react-redux";
import { useMemo } from "react";

const useAssortedProducts = (productId) => {
  const productsStore = useSelector((state) => state?.product?.data);

  const productSelected = useMemo(() => {
    return productsStore.find((product) => product._id === productId);
  }, [productsStore, productId]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const assortedProducts = useMemo(() => {
    if (!productSelected) return [];

    const filteredProducts = productsStore.filter(
      (product) =>
        product._id !== productId &&
        product.isActive &&
        !product.isArchived &&
        Array.isArray(product?.tags) &&
        product?.tags.some((tag) => productSelected?.tags.includes(tag))
    );

    return shuffleArray(filteredProducts);
  }, [productsStore, productId, productSelected]);

  return assortedProducts;
};

export default useAssortedProducts;
