import React, { useEffect, useState } from "react";
import PromocodesCard from "./PromocodesCard";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import useCreatePromocode from "./hooks/useCreatePromocode";
import useDeletePromocode from "./hooks/useDeletePromocode";
import Modal from "./Modal";

const Promocodes = () => {
  const promocodes = useSelector((state) => state?.promocode?.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    percentage: "",
    dateExpire: "",
  });
  const [error, setError] = useState(false);
  const { createPromoCode } = useCreatePromocode();
  const { deletePromoCode } = useDeletePromocode();
  useEffect(() => {
    const currentDate = new Date();
    const expirationDate = new Date(formData.dateExpire);
    if (formData.dateExpire !== "" && currentDate > expirationDate) {
      setError(true);
    } else {
      setError(false);
    }
  }, [formData.dateExpire]);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const id = uuidv4();
    const formatData = { ...formData, id };
    createPromoCode(formatData);
    setIsModalOpen(false);
    setFormData({
      code: "",
      percentage: "",
      dateExpire: "",
    });
  };

  const handleDeletePromocode = (id) => {
    deletePromoCode(id);
  };

  const isFormCompleted =
    formData.code && formData.percentage && formData.dateExpire && !error;

  return (
    <div className="promocodes">
      <div className="addPromocode card" onClick={handleOpenModal}>
        <span>
          <IoIosAddCircleOutline />
        </span>{" "}
      </div>
      {promocodes.map((promocode) => (
        <PromocodesCard
          key={promocode.id}
          promocode={promocode}
          handleDeletePromocode={handleDeletePromocode}
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
    </div>
  );
};

export default Promocodes;
