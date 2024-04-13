import { useEffect, useState } from "react";
import { storage } from "../../../../../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import useInitDataMaterials from "../../../hooks/useInitDataMaterials";
import { useDispatch } from "react-redux";
import {
  addMainImagesToRemove,
  changeMainImage,
  deleteMainImage,
} from "../../../../../../../features/admin/productSlice";

const useMaterials = ({
  material,
  addMaterialData,
  currentAction,
  currentProductId,
  isWithMaterial,
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
  const [originalMainImage, setOriginalMainImage] = useState("");
  const [addNewimage, setAddNewImage] = useState(false);
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
    dispatch(
      deleteMainImage({ materialId: material._id, productId: currentProductId })
    );
  };
  const handleAddNewImage = () => {
    setAddNewImage(false);
    dispatch(
      changeMainImage({
        materialId: material._id,
        productId: currentProductId,
        value: mainImage?.name,
      })
    );

    dispatch(addMainImagesToRemove(originalMainImage));
  };
  const handleMainImageChange = async (e) => {
    const file = e.target.files[0];
    setMainImage(file);
    setAddNewImage(true);
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
      _id: material?._id,
      pricing: newPricing,
      promotion: newPromo,
      main_image: mainImage,
      untilNew: newDate,
      stock: newStock,
    };
    addMaterialData(newMaterialData);
  };
  useEffect(() => {
    if (currentAction === "edit" && data?.mainImage) {
      setOriginalMainImage(data.mainImage);
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
    addNewimage,
    handleAddNewImage,
  };
};

export default useMaterials;
