import { useSelector } from "react-redux";
import useFirebaseImage from "../../../../../../../../shared/hooks/useFirebaseImage";
import { getCreditsInfo } from "../../../../../../../../selectors/credit";
import { getProductProperties } from "../../../../../../../../selectors/product";
// import { getMaterialProperty } from "../../../../../../../selectors/material";

const useProductHeader = (orderProducts, productsId, productStore, material) => {
  const { amount, code, dateExpire } = useSelector((state) =>
    getCreditsInfo(state, { productsId: orderProducts._id })
  ) || {};
  const collectionStore = useSelector((state) => state?.collection?.data);
  const categoryStore = useSelector((state) => state?.category?.data);
  const tagStore = useSelector((state) => state?.tag?.data);
  const materialStore = useSelector((state) => state?.material?.data);

  const { collection, category, name, pricing, main_image } = getProductProperties(
    productsId,
    productStore,
    collectionStore,
    categoryStore,
    tagStore,
    material
  ) || {};

  const { imageUrl } = useFirebaseImage(main_image);

  return {
    amount,
    code,
    dateExpire,
    collection,
    category,
    name,
    pricing,
    main_image,
    imageUrl,
    materialStore
  };
};

export default useProductHeader;
