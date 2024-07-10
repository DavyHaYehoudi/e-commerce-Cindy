import { useSelector } from "react-redux";
import useFirebaseImage from "./useFirebaseImage";
import useCartButton from "./useCartButton";
import useStoreInfo from "./useStoreInfo";
import { getProductProperties } from "../../selectors/product";
import { formatPrice } from "../../helpers/utils/prices";

const useCartItem = (product) => {
  const productStore = useSelector((state) => state?.product?.data);
  const collectionStore = useSelector((state) => state?.collection?.data);
  const categoryStore = useSelector((state) => state?.category?.data);
  const tagStore = useSelector((state) => state?.tag?.data);

  const { productsId, material } = product || {};
  const productInStore = productStore.find(
    (product) => product?._id === productsId
  );
  let imagePath;
  if (productInStore) {
    const materialMatch = productInStore.materials.find(
      (mat) => mat?._id === material
    );
    imagePath = materialMatch
      ? materialMatch.main_image
      : productInStore.materials[0]?.main_image;
  }

  const { imageUrl } = useFirebaseImage(imagePath);
  const { handleRemoveToCart } = useCartButton(productsId, material);

  const { quantity } = useStoreInfo({ productsId, material });

  const itemName = getProductProperties(
    productsId,
    productStore,
    collectionStore,
    categoryStore,
    tagStore,
    material
  ).name;

  const productInfo = getProductProperties(
    productsId,
    productStore,
    collectionStore,
    categoryStore,
    tagStore,
    material
  );
  let price = productInfo?.pricing?.currentPrice;
  const { promotion } = productInfo;

  if (promotion?.endDate && new Date(promotion.endDate) > new Date()) {
    price -= (price * promotion?.amount) / 100;
  }

  const itemSubtotal = formatPrice(price * quantity);

  return {
    imageUrl,
    itemName,
    quantity,
    price,
    itemSubtotal,
    handleRemoveToCart,
  };
};

export default useCartItem;
