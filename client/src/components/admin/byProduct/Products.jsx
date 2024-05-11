import React from "react";
import { useSelector } from "react-redux";
import ProductsCard from "./ProductsCard";
import { IoIosAddCircleOutline } from "react-icons/io";
import Modal from "./productManagment";
import useMainImagesToAddStorage from "./productManagment/bodyCheat/sections/hooks/useMainImagesToAddStorage";
import useProductModal from "./productManagment/hooks/useProductModal";


const Products = () => {
  const productsStore = useSelector((state) => state?.product?.data);
  const { reset } = useMainImagesToAddStorage();

  const {
    handleOpenModal,
    handleCloseModal,
    data,
    isWithMaterial,
    isModalOpen,
    currentAction,
    currentProductId,
  } = useProductModal({
    currentAction: "create",
    currentProductId: null,
    reset,
  });

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
