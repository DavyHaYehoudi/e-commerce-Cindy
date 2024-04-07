import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductsCard from "./ProductsCard";
import { IoIosAddCircleOutline } from "react-icons/io";
import Modal from "./productManagment";
import useInitData from "./productManagment/hooks/useInitDataMain";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const productsStore = useSelector((state) => state?.product?.data);
  const [currentAction, setCurrentAction] = useState("create");
  const [currentProductId, setCurrentProductId] = useState(null);

  const handleOpenModal = (action, _id) => {
    setCurrentAction(action);
    setIsModalOpen(true);
    setCurrentProductId(_id);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const { initDataMain } = useInitData({
    action: currentAction,
    initialImageCount: 5,
    productId: currentProductId,
  });
  const data = initDataMain();
  const product= productsStore?.find(product=>product?._id===currentProductId)
  const isWithMaterial = product?.materials?.every(item=>item._id)

  return (
    <div className="products">
      <div
        className="addProduct card"
        onClick={() => handleOpenModal("create")}
      >
        <span>
          <IoIosAddCircleOutline />
        </span>{" "}
      </div>
      {productsStore &&
        productsStore?.map((product) => (
          <ProductsCard
            key={product?._id}
            product={product}
            handleOpenModal={handleOpenModal}
          />
        ))}
      {isModalOpen && (
        <div className="overlay">
          <Modal
            handleCloseModal={handleCloseModal}
            data={data}
            currentAction={currentAction}
            currentProductId={currentProductId}
            isWithMaterial={isWithMaterial}
          />
        </div>
      )}
    </div>
  );
};

export default Products;
