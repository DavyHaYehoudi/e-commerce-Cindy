import { useEffect, useState } from "react";
import { storage } from "../../../../../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import useInitDataMaterials from "../../../hooks/useInitDataMaterials";
import { useDispatch } from "react-redux";
import {
  updateProductMaterials,
  mainImagesToRemoveStorage,
} from "../../../../../../../features/admin/productSlice";
import { generateFilePath } from "../../utils/generateFilePath";

const useMaterials = ({
  material,
  currentAction,
  currentProductId,
  isWithMaterial,
  addMainImageToStorage,
}) => {
  const dispatch = useDispatch();
  const { initDataMaterials } = useInitDataMaterials({
    action: currentAction,
    productId: currentProductId,
    material,
    isWithMaterial,
  });
  const data = initDataMaterials();

  const initStock = data?.stock;
  const initCurrentPrice = data?.currentPrice;
  const initOldPrice = data?.oldPrice;
  const initNewDate = data?.newDate;
  const initAmount = data?.amount;
  const initStartDate = data?.startDate;
  const initEndDate = data?.endDate;
  const initMainImage = data?.mainImage;
  const initIsActive = data?.isActive;
  const [isChecked, setIsChecked] = useState(false);
  const [stock, setStock] = useState(initStock);
  const [pricing, setPricing] = useState({
    currentPrice: initCurrentPrice,
    oldPrice: initOldPrice,
  });
  const [newDate, setNewDate] = useState(initNewDate);
  const [promo, setPromo] = useState({
    amount: initAmount,
    startDate: initStartDate,
    endDate: initEndDate,
  });
  const [mainImage, setMainImage] = useState(initMainImage);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [productActive, setProductActive] = useState(initIsActive);

  const handleSwitchChange = (isChecked) => {
    setProductActive(isChecked);
    dispatch(
      updateProductMaterials({ _id: material?._id, isActive: isChecked })
    );
  };
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const handleStockChange = (e) => {
    const newStock = parseInt(e.target.value);
    setStock(newStock);
    dispatch(updateProductMaterials({ _id: material?._id, stock: newStock }));
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
    dispatch(
      updateProductMaterials({ _id: material?._id, newDate: newDateValue })
    );
  };
  const handlePricingChange = (e, property) => {
    const newValue = parseInt(e.target.value);
    setPricing((prevPricing) => ({
      ...prevPricing,
      [property]: newValue,
    }));
    dispatch(
      updateProductMaterials({
        _id: material?._id,
        pricing: { ...pricing, [property]: newValue },
      })
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

      if (
        updatedPromo.amount ||
        updatedPromo.startDate ||
        updatedPromo.endDate
      ) {
        if (
          !updatedPromo.amount ||
          !updatedPromo.startDate ||
          !updatedPromo.endDate
        ) {
          updatedErrorMessage = "Remplir les 3 champs promotion";
        }
      }
      if (property === "startDate") {
        if (startDateValue < currentDate) {
          updatedErrorMessage =
            "La date de début de la promotion doit être postérieure ou égale à la date actuelle";
        } else if (endDateValue && endDateValue <= startDateValue) {
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
    dispatch(
      updateProductMaterials({
        _id: material?._id,
        promo: { ...promo, [property]: newValue },
      })
    );
  };
  const handleDeleteImage = () => {
    if (mainImage && !mainImage?.name) {
      dispatch(mainImagesToRemoveStorage(mainImage));
    }
    setMainImage(null);
    dispatch(updateProductMaterials({ _id: material?._id, main_image: null }));
  };
  const handleMainImageChange = async (e) => {
    if (mainImage && !mainImage?.name) {
      dispatch(mainImagesToRemoveStorage(mainImage));
    }
    const file = e.target.files[0];
    setMainImage(file);
    const path = generateFilePath(file, "products/main/");
    dispatch(updateProductMaterials({ _id: material?._id, main_image: path }));
    addMainImageToStorage({
      materialId: material?._id,
      file,
      path,
    });
  };

  useEffect(() => {
    if (currentAction === "edit" && data?.mainImage) {
      const fetchImagesFromStorage = async () => {
        try {
          if (data.mainImage.startsWith("products/main")) {
            setLoading(true);
            const url = await getDownloadURL(ref(storage, data?.mainImage));
            setMainImage(url);
            setLoading(false);
          }
        } catch (error) {
          console.error(
            "Erreur lors du chargement de l'image principale depuis Firebase Storage :",
            error
          );
          setLoading(false);
        }
      };

      fetchImagesFromStorage();
    }
  }, [currentAction, data?.mainImage]);
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
    productActive,
    handleSwitchChange,
  };
};

export default useMaterials;
