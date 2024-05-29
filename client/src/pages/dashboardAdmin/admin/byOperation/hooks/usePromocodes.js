import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUnauthorizedRedirect from "../../../../../services/errors/useUnauthorizedRedirect";
import {
  createPromocode,
  deletePromocode,
} from "../../../../../features/admin/promocodeSlice";

const usePromocodes = () => {
  const promocodes = useSelector((state) => state?.promocode?.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    percentage: "",
    dateExpire: "",
  });
  const [error, setError] = useState(false);
  const handleUnauthorized = useUnauthorizedRedirect();
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
    dispatch(createPromocode({ formatData, handleUnauthorized }));
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
      dispatch(deletePromocode({ promocodeId, handleUnauthorized }));
    }
  };

  const isFormCompleted =
    formData.code && formData.percentage && formData.dateExpire && !error;

  return {
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
  };
};

export default usePromocodes;
