import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useMainContent = ({ productId,materialId }) => {
  const [materialSelected, setMaterialSelected] = useState({
    id: "",
    index: "",
    currentImage: "",
  });
  const productsStore = useSelector((state) => state?.product?.data);
  const product = productsStore?.find((product) => product?._id === productId);

  useEffect(() => {
    if (product && product.materials && product.materials.length > 0) {
      const indexInit = product.materials.findIndex(m=>m._id===materialId)
      const currentImageInit = product.materials[indexInit].main_image
      setMaterialSelected({
        id:materialId,
        index: indexInit,
        currentImage: currentImageInit,
      });
    }
  }, [productId, product,materialId]);

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

export default useMainContent;
