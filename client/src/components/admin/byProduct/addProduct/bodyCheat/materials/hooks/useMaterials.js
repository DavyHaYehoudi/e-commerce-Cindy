import { useState } from "react";
import { storage } from "../../../../../../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const useMaterials = (initialMaterial, addMaterialData) => {
  const [isChecked, setIsChecked] = useState(false);
  const [stock, setStock] = useState(1);
  const [pricing, setPricing] = useState({ currentPrice: 0, oldPrice: 0 });
  const [newDate, setNewDate] = useState("");
  const [promo, setPromo] = useState({ amount: 0, startDate: "", endDate: "" });
  const [mainImage, setMainImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleStockChange = (e) => {
    const newStock = parseInt(e.target.value);
    setStock(newStock);
    updateMaterialsData(newStock, pricing, promo, newDate, mainImage);
  };

  const handleNewDateChange = (e) => {
    const newDateValue = e.target.value;
    setNewDate(newDateValue);
    const currentDate = new Date();
    if (new Date(newDateValue) <= currentDate) {
      setErrorMessage(
        "La date de durée de nouveauté doit être postérieure à la date actuelle."
      );
    } else {
      setErrorMessage("");
    }
    updateMaterialsData(stock, pricing, promo, newDateValue, mainImage);
  };

  const handlePricingChange = (e, property) => {
    const newValue = parseInt(e.target.value);
    setPricing((prevPricing) => ({
      ...prevPricing,
      [property]: newValue,
    }));
    updateMaterialsData(
      stock,
      { ...pricing, [property]: newValue },
      promo,
      newDate,
      mainImage
    );
  };

  const handlePromoChange = (e, property) => {
    const newValue = e.target.value;
    setPromo((prevPromo) => {
      const updatedPromo = { ...prevPromo, [property]: newValue };
      let updatedErrorMessage = "";

      const currentDate = new Date();
      const startDateValue = new Date(updatedPromo.startDate);
      const endDateValue = new Date(updatedPromo.endDate);
      if (property === "startDate") {
        if (startDateValue < currentDate) {
          updatedErrorMessage =
            "La date de début de la promotion doit être postérieure ou égale à la date actuelle";
        } else if (endDateValue && endDateValue < startDateValue) {
          updatedErrorMessage =
            "La date de fin de la promotion doit être postérieure à la date de début de la promotion";
        }
      } else if (property === "endDate") {
        if (endDateValue && endDateValue < currentDate) {
          updatedErrorMessage =
            "La date de fin de la promotion doit être postérieure ou égale à la date actuelle";
        } else if (startDateValue < currentDate) {
          updatedErrorMessage =
            "La date de début de la promotion doit être postérieure ou égale à la date actuelle";
        } else if (endDateValue && endDateValue < startDateValue) {
          updatedErrorMessage =
            "La date de fin de la promotion doit être postérieure à la date de début de la promotion";
        }
      }

      setErrorMessage(updatedErrorMessage);
      return updatedPromo;
    });

    // Déplacer l'appel à updateMaterialsData ici
    updateMaterialsData(
      stock,
      pricing,
      { ...promo, [property]: newValue },
      newDate,
      mainImage
    );
  };
  // Fonction pour supprimer une image du state
  const handleDeleteImage = () => {
    setMainImage(null);
  };

  const handleMainImageChange = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      await uploadMainImageToFirebaseStorage(file);
      setLoading(false);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const uploadMainImageToFirebaseStorage = async (file) => {
    const uniqueId = uuidv4();
    const fileExtension = file.name.split(".").pop();
    const filePath = `products/main/${uniqueId}.${fileExtension}`;

    const storageRef = ref(storage, filePath);
    await uploadBytes(storageRef, file);
    setMainImage(filePath);
    updateMaterialsData(stock, pricing, promo, newDate, filePath);
  };

  const updateMaterialsData = (
    newStock,
    newPricing,
    newPromo,
    newDate,
    mainImage
  ) => {
    const newMaterialData = {
      _id: initialMaterial?._id,
      pricing: newPricing,
      promotion: newPromo,
      main_image: mainImage,
      untilNew: newDate,
      stock: newStock,
    };
    addMaterialData(newMaterialData);
  };

  return {
    isChecked,
    stock,
    pricing,
    newDate,
    setNewDate,
    promo,
    setPromo,
    mainImage,
    handleCheckboxChange,
    handleStockChange,
    handleNewDateChange,
    handlePricingChange,
    handlePromoChange,
    handleMainImageChange,
    errorMessage,
    loading,
    handleDeleteImage,
  };
};

export default useMaterials;
