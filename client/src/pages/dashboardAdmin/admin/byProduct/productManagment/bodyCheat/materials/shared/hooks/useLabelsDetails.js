import { useSelector } from "react-redux";

const useLabelsDetails = (currentProductId, materialId, data) => {
  const productsStore = useSelector((state) => state?.product?.data);
  const product = productsStore?.find(
    (product) => product?._id === currentProductId
  );
  const productMaterial = product?.materials?.find(
    (mat) => mat?._id === materialId
  );

  const promotion = productMaterial
    ? productMaterial?.promotion?.endDate
    : data?.materials[0]?.promotion?.endDate;
  const untilNew = productMaterial
    ? productMaterial?.untilNew
    : data?.materials[0]?.untilNew;

  const expiredDate = (date) => {
    const today = new Date();
    return today > new Date(date);
  };

  return { promotion, untilNew, expiredDate };
};

export default useLabelsDetails;
