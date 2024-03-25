import React, { useEffect, useState } from "react";
import PromocodesCard from "./PromocodesCard";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import {
  createPromocode,
  deletePromocode,
} from "../../../features/admin/promocodeSlice";

const Promocodes = () => {
  const promocodes = useSelector((state) => state?.promocode?.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    percentage: "",
    dateExpire: "",
  });
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

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
    const formatData = { ...formData };
    dispatch(createPromocode(formatData));
    setIsModalOpen(false);
    setFormData({
      code: "",
      percentage: "",
      dateExpire: "",
    });
  };

  const handleDeletePromocode = (promocodeId) => {
    const isConfirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce code promo ?"
    );
    if (isConfirmed) {
      dispatch(deletePromocode(promocodeId));
    }
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
          key={promocode._id}
          promocode={promocode}
          handleDeletePromocode={() => handleDeletePromocode(promocode._id)}
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
