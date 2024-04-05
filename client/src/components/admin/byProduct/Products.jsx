import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductsCard from "./ProductsCard";
import { IoIosAddCircleOutline } from "react-icons/io";
import Modal from "./addProduct";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const products = useSelector((state) => state?.product?.data);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="products">
      <div className="addProduct card" onClick={handleOpenModal}>
        <span>
          <IoIosAddCircleOutline />
        </span>{" "}
      </div>
      {products &&
        products?.map((product) => <ProductsCard key={product?._id} product={product} />)}
      {isModalOpen && (
        <div className="overlay">
          <Modal handleCloseModal={handleCloseModal} />
        </div>
      )}
    </div>
  );
};

export default Products;
