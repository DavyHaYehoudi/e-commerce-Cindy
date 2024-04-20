import { useState } from "react";
import { useSelector } from "react-redux";
import useMainImagesToAddStorage from "../bodyCheat/sections/hooks/useMainImagesToAddStorage";
import useInitDataMain from "./useInitDataMain";

const useProductModal = ({
  currentAction: initialAction,
  currentProductId: initialProductId,
  reset,
}) => {
  const [isModalOpen, setIsModalOpenLocal] = useState(false);
  const [currentAction, setCurrentActionLocal] = useState(initialAction);
  const [currentProductId, setCurrentProductIdLocal] = useState(initialProductId);

  const productsStore = useSelector((state) => state?.product?.data);
  const { reset: resetMainImagesToAddStorage } = useMainImagesToAddStorage();

  const { initDataMain } = useInitDataMain({
    action: currentAction,
    initialImageCount: 5,
    productId: currentProductId,
  });
  const data = initDataMain();

  const product = productsStore?.find(
    (product) => product?._id === currentProductId
  );
  const isWithMaterial = product?.materials?.every((item) => item?._id);

  const handleOpenModal = (action, _id) => {
    setIsModalOpenLocal(true);
    setCurrentActionLocal(action);
    setCurrentProductIdLocal(_id);
  };

  const handleCloseModal = () => {
    setIsModalOpenLocal(false);
    reset();
    resetMainImagesToAddStorage();
  };

  return {
    handleOpenModal,
    handleCloseModal,
    data,
    isWithMaterial,
    isModalOpen,
    currentAction,
    currentProductId,
  };
};

export default useProductModal;
