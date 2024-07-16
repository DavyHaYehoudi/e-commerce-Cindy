import React from "react";
import PromocodesCard from "./PromocodesCard";
import { IoIosAddCircleOutline } from "react-icons/io";
import Modal from "./Modal";
import { ToastContainer } from "react-toastify";
import usePromocodes from "./hooks/usePromocodes";

const Promocodes = () => {
  const {
    promocodes,
    isModalOpen,
    formData,
    error,
    handleOpenModal,
    handleCloseModal,
    handleInputChange,
    handleSubmit,
    handleDeletePromocode,
    isFormCompleted,
  } = usePromocodes();

  return (
    <div className="promocodes">
      <div className="addPromocode card" onClick={handleOpenModal}>
        <span>
          <IoIosAddCircleOutline />
        </span>{" "}
      </div>
      {promocodes &&
        promocodes.length > 0 &&
        promocodes.map((promocode) => (
          <PromocodesCard
            key={promocode?._id}
            promocode={promocode}
            handleDeletePromocode={() => handleDeletePromocode(promocode?._id)}
          />
        ))}

      {isModalOpen && (
        <Modal
          handleCloseModal={handleCloseModal}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          formData={formData}
          isFormCompleted={isFormCompleted}
          error={error}
        />
      )}
      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default Promocodes;
