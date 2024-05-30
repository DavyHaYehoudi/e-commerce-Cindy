import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const useProductContent = () => {
  const [materialSelected, setMaterialSelected] = useState({
    id: "",
    index: 0,
    currentImage: "",
  });
  const { productId } = useParams();
  const productsStore = useSelector((state) => state?.product?.data);
  const product = productsStore?.find((product) => product?._id === productId);

  useEffect(() => {
    if (product && product.materials && product.materials.length > 0) {
      const defaultMaterial = product.materials[0];
      setMaterialSelected({
        id: defaultMaterial._id,
        index: 0,
        currentImage: defaultMaterial.main_image,
      });
    }
  }, [productId, product]);

  const handleMaterialSelected = (updates) => {
    setMaterialSelected((prev) => ({ ...prev, ...updates }));
  };

  const handleAddToCart = (productId) => {
    console.log(`Ajouter au panier : ${productId}`);
  };

  return {
    product,
    materialSelected,
    handleMaterialSelected,
    handleAddToCart,
  };
};

export default useProductContent;
