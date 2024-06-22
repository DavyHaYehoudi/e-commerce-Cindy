import { useSelector } from "react-redux";
import { getProductsInfo } from "../../../../../selectors/orderProducts";
import { getProductProperties } from "../../../../../selectors/product";
import useFirebaseImage from "../../../../../shared/hooks/useFirebaseImage";
import { getMaterialProperty } from "../../../../../selectors/material";

const useOrderProductDetails = (
  orderProductsItem,
  orderProductsStore,
  orderId
) => {
  const productStore = useSelector((state) => state?.product?.data);
  const collectionStore = useSelector((state) => state?.collection?.data);
  const categoryStore = useSelector((state) => state?.category?.data);
  const tagStore = useSelector((state) => state?.tag?.data);
  const materialStore = useSelector((state) => state?.material?.data);
  const ordersStore = useSelector((state) => state?.customer?.data?.orders);
  const creditStore = useSelector((state) => state?.customer?.data?.credit);

  const { amount, code, dateExpire } =
    creditStore?.find((cdt) => cdt.orderProductsId === orderProductsItem._id) ||
    {};

  const { productsId, material, quantity } = orderProductsItem || {};
  const { orderProductsInfo, isTagProductExisted } = getProductsInfo(
    ordersStore,
    orderProductsStore,
    orderId,
    orderProductsItem._id
  );

  const { name, pricing, main_image, collection, category } =
    getProductProperties(
      productsId,
      productStore,
      collectionStore,
      categoryStore,
      tagStore,
      material
    );

  const { exchange, refund, credit } = orderProductsInfo ?? {};
  const { imageUrl } = useFirebaseImage(main_image);

  return {
    name,
    pricing,
    main_image,
    collection,
    category,
    exchange,
    refund,
    credit,
    amount,
    code,
    dateExpire,
    productsId,
    quantity,
    material,
    isTagProductExisted,
    imageUrl,
    materialName: getMaterialProperty(material, materialStore)?.name,
  };
};

export default useOrderProductDetails;
