import { useSelector } from "react-redux";
import { getProductProperties } from "../../../../../../selectors/product";
import { getMaterialProperty } from "../../../../../../selectors/material";
import useFirebaseImage from "../../../../../../shared/hooks/useFirebaseImage";

const useProductDetails = (productsId, material) => {
  const productStore = useSelector((state) => state?.product?.data);
  const collectionStore = useSelector((state) => state?.collection?.data);
  const categoryStore = useSelector((state) => state?.category?.data);
  const tagStore = useSelector((state) => state?.tag?.data);
  const materialStore = useSelector((state) => state?.material?.data);

  const productProperties = getProductProperties(
    productsId,
    productStore,
    collectionStore,
    categoryStore,
    tagStore,
    material
  );

  const materialName = getMaterialProperty(material, materialStore)?.name;
  const { imageUrl } = useFirebaseImage(productProperties.main_image);

  return {
    productProperties,
    materialName,
    imageUrl,
  };
};

export default useProductDetails;
