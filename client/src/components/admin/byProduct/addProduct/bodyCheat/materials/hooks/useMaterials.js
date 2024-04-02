import { useState } from "react";

const useMaterials = (initialMaterial, addMaterialData) => {
  const [isChecked, setIsChecked] = useState(false);
  const [stock, setStock] = useState(0);
  const [pricing, setPricing] = useState({ currentPrice: 0, oldPrice: 0 });
  const [newDate, setNewDate] = useState("");
  const [promo, setPromo] = useState({ amount: 0, startDate: "", endDate: "" });
  const [mainImage, setMainImage] = useState(null);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleStockChange = (e) => {
    const newStock = e.target.value;
    setStock(newStock);
    updateMaterialsData(newStock, pricing, promo, newDate, mainImage);
  };

  const handleNewDateChange = (e) => {
    const newDateValue = e.target.value;
    setNewDate(newDateValue);
    updateMaterialsData(stock, pricing, promo, newDateValue, mainImage);
  };

  const handlePricingChange = (e, property) => {
    const newValue = e.target.value;
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
    setPromo((prevPromo) => ({
      ...prevPromo,
      [property]: newValue,
    }));
    updateMaterialsData(
      stock,
      pricing,
      { ...promo, [property]: newValue },
      newDate,
      mainImage
    );
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setMainImage(reader.result);
      updateMaterialsData(stock, pricing, promo, newDate, reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
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
  };
};

export default useMaterials;
