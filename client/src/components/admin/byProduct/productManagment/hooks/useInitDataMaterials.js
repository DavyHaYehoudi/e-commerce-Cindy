import { useSelector } from "react-redux";
import formatDateMaterials from "../../../../../helpers/utils/products/formatDateMaterials";

const useInitDataMaterials = ({
  action,
  productId,
  material,
  isWithMaterial,
}) => {
  const productsStore = useSelector((state) => state?.product?.data);

  const initDataMaterials = () => {
    let data = {};

    if (action === "create") {
      data["stock"] = 1;
      data["currentPrice"] = 0;
      data["oldPrice"] = 0;
      data["newDate"] = "";
      data["amount"] = 0;
      data["startDate"] = "";
      data["endDate"] = "";
      data["mainImage"] = null;
    } else if (action === "edit") {
      const product = productsStore.find(
        (product) => product?._id === productId
      );
      let root;
      const materialMatch = product?.materials?.find(
        (mat) => mat?._id === material?._id
      );
      if (isWithMaterial && materialMatch) {
        root = materialMatch;
      } else if (isWithMaterial && !materialMatch) {
        return;
      } else if (!isWithMaterial) {
        root = product?.materials[0];
      }

      const { stock, pricing, untilNew, promotion, main_image } = root || {};

      data["stock"] = stock;
      data["currentPrice"] = pricing?.currentPrice;
      data["oldPrice"] = pricing?.oldPrice;
      data["newDate"] = formatDateMaterials(untilNew);
      data["amount"] = promotion?.amount;
      data["startDate"] = formatDateMaterials(promotion?.startDate);
      data["endDate"] = formatDateMaterials(promotion?.endDate);
      data["mainImage"] = main_image;
    }
    return data;
  };

  return { initDataMaterials };
};

export default useInitDataMaterials;
