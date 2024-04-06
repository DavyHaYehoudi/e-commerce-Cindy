import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductsCard from "./ProductsCard";
import { IoIosAddCircleOutline } from "react-icons/io";
import Modal from "./productManagment";
import useInitData from "./productManagment/hooks/initData";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const products = useSelector((state) => state?.product?.data);
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
  const { initData } = useInitData({
    action: currentAction,
    initialImageCount: 5,
    _id: currentProductId,
  });
  const data = initData();

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
      {products &&
        products?.map((product) => (
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
          />
        </div>
      )}
    </div>
  );
};

export default Products;
