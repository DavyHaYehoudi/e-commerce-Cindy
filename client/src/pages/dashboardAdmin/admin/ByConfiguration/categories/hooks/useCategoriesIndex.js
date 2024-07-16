import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  categoryToRemove,
  deleteCategory,
  updateCategory,
} from "../../../../../../features/admin/categorySlice";
import useUnauthorizedRedirect from "../../../../../../services/errors/useUnauthorizedRedirect";
import { Get } from "../../../../../../services/httpMethods";
import { generateFilePath } from "../../../../../../helpers/utils/generateFilePath";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../../../../../firebase";
import { toast } from "react-toastify";

const useCategoriesIndex = () => {
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const [selectedParentCollections, setSelectedParentCollections] = useState(
    []
  );
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isContentVisible, setIsContentVisible] = useState(false);
  const categoriesStore = useSelector((state) => state?.category?.data);
  const collectionsStore = useSelector((state) => state?.collection?.data);
  const orderProductsStore = useSelector((state) => state?.orderProducts?.data);
  const [openModal, setOpenModal] = useState(false);
  const [productSolded, setProductSolded] = useState([]);
  const [productsLinkedToCategories, setProductsLinkedToCategories] = useState(
    []
  );
  const categoryId = useSelector((state) => state?.category?.categoryId);
  const productsStore = useSelector((state) => state?.product?.data);
  const nameModal = categoriesStore.find(
    (category) => category._id === categoryId
  )?.name;
  const [loading, setLoading] = useState(false);
  const main_image = useSelector((state) => state?.category?.illustration);
  const categoryIdEdit = useSelector(
    (state) => state?.category?.categoryIdEdit
  );

  const handleUnauthorized = useUnauthorizedRedirect();
  const dispatch = useDispatch();

  const handleAddCategory = async ({ mainImageCreate, setMainImageCreate }) => {
    if (newCategoryName.trim() === "") {
      return toast.error("Le nom ne peut pas être vide");
    }
    if (newCategoryName.length > 50) {
      return toast.error("Le nom ne peut pas dépasser 50 caractères.");
    }
    if (
      newCategoryName.trim() !== "" &&
      newCategoryName.length <= 50 &&
      selectedParentCollections.length > 0 &&
      mainImageCreate
    ) {
      setLoading(true);
      try {
        await Get("auth/verify-token/admin", null, handleUnauthorized);
        const path = generateFilePath(mainImageCreate, "categories/");
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, mainImageCreate);
        setMainImageCreate(null);
        dispatch(
          addCategory({
            name: newCategoryName,
            parentCollection: selectedParentCollections,
            main_image: path,
            handleUnauthorized,
          })
        );
        resetState();
        setLoading(false);
      } catch (error) {
        console.log(
          "Erreur ajout illustration catégorie dans firebase storage",
          error
        );
        setLoading(false);
      }
    }
  };
  const handleKeyPress = ({ event, mainImageCreate, setMainImageCreate }) => {
    if (event.key === "Enter") {
      handleAddCategory({ mainImageCreate, setMainImageCreate });
    }
  };
  const handleDeleteCategory = (categoryId) => {
    dispatch(categoryToRemove(categoryId));
    const productsLinkedToCategoriesSearch = productsStore.filter(
      (product) => product?.category === categoryId
    );
    if (productsLinkedToCategoriesSearch.length > 0) {
      setProductsLinkedToCategories(productsLinkedToCategoriesSearch);
      const isProductInOrderProducts = orderProductsStore.filter(
        (orderProduct) =>
          productsLinkedToCategoriesSearch.some(
            (p) => p?._id === orderProduct?.productsId
          )
      );
      if (isProductInOrderProducts) {
        setProductSolded(isProductInOrderProducts);
      }
    }
    setOpenModal(true);
  };
  const handleConfirm = async () => {
    if (productSolded.length > 0) {
      const formData = { isArchived: true };
      dispatch(
        updateCategory({
          categoryId,
          productSolded,
          formData,
          handleUnauthorized,
        })
      );
    } else {
      dispatch(
        deleteCategory({
          categoryId,
          handleUnauthorized,
        })
      );
    }
    const illustrationToRemove = categoriesStore.find(
      (category) => category?._id === categoryId
    )?.main_image;
    const url = await getDownloadURL(ref(storage, illustrationToRemove));
    const imageRef = ref(storage, url);
    await deleteObject(imageRef);
    console.log("Image illustration supprimée avec succès !");
    dispatch(categoryToRemove(""));
    setProductsLinkedToCategories([]);
    setProductSolded([]);
    setOpenModal(false);
  };
  const handleCancel = () => {
    dispatch(categoryToRemove(""));
    setProductsLinkedToCategories([]);
    setProductSolded([]);
    setOpenModal(false);
  };
  const handleEditCategory = async ({
    addIllustrationToStorage,
    removeIllustrationToStorage,
    setAddIllustrationToStorage,
    setRemoveIllustrationToStorage,
  }) => {
    if (editedCategoryName.trim() === "") {
      return toast.error("Le nom ne peut pas être vide");
    }
    if (editedCategoryName.length > 50) {
      return toast.error("Le nom ne peut pas dépasser 50 caractères.");
    }
    if (editedCategoryName.trim() !== "" && editedCategoryName.length <= 50) {
      setLoading(true);
      const formData = {
        name: editedCategoryName,
        parentCollection: selectedParentCollections,
        main_image,
      };
      try {
        // Vérifier le token avant d'interagir avec Firebase Storage
        await Get("auth/verify-token/admin", null, handleUnauthorized);
        if (addIllustrationToStorage && categoryIdEdit) {
          const { path, file } = addIllustrationToStorage;
          const storageRef = ref(storage, path);
          await uploadBytes(storageRef, file);
          dispatch(
            updateCategory({
              categoryId: editCategoryId,
              formData,
              handleUnauthorized,
            })
          );
          console.log("Image illustration envoyée avec succès !");
        }
        if (removeIllustrationToStorage) {
          const imageUrl = removeIllustrationToStorage;
          const imageRef = ref(storage, imageUrl);
          await deleteObject(imageRef);
          console.log("Image illustration supprimée avec succès !");
        }
        setLoading(false);
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour de l'image categorie dans firebase storage :",
          error
        );
        setLoading(false);
      } finally {
        setAddIllustrationToStorage(null);
        setRemoveIllustrationToStorage(null);
        setLoading(false);
      }

      dispatch(
        updateCategory({
          categoryId: editCategoryId,
          formData,
          handleUnauthorized,
        })
      );
      setEditCategoryId(null);
      setEditedCategoryName("");
      resetState();
    }
  };
  const handleKeyPressEdit = ({
    event,
    addIllustrationToStorage,
    removeIllustrationToStorage,
    setAddIllustrationToStorage,
    setRemoveIllustrationToStorage,
  }) => {
    if (event.key === "Enter") {
      handleEditCategory({
        addIllustrationToStorage,
        removeIllustrationToStorage,
        setAddIllustrationToStorage,
        setRemoveIllustrationToStorage,
      });
    }
  };
  const handleEditClick = (categoryId, categoryName, parentCollections) => {
    setEditCategoryId(categoryId);
    setEditedCategoryName(categoryName);
    setSelectedParentCollections(parentCollections);
  };
  const handleSaveClick = ({
    addIllustrationToStorage,
    removeIllustrationToStorage,
    setAddIllustrationToStorage,
    setRemoveIllustrationToStorage,
  }) => {
    if (editedCategoryName.trim() !== "") {
      handleEditCategory({
        addIllustrationToStorage,
        removeIllustrationToStorage,
        setAddIllustrationToStorage,
        setRemoveIllustrationToStorage,
      });
    }
  };
  const resetState = () => {
    setNewCategoryName("");
    setEditCategoryId(null);
    setEditedCategoryName("");
    setSelectedParentCollections([]);
  };

  return {
    editCategoryId,
    editedCategoryName,
    selectedParentCollections,
    newCategoryName,
    isContentVisible,
    categoriesStore,
    collectionsStore,
    openModal,
    productsLinkedToCategories,
    productSolded,
    nameModal,
    setEditCategoryId,
    setEditedCategoryName,
    setNewCategoryName,
    setIsContentVisible,
    setSelectedParentCollections,
    handleAddCategory,
    handleDeleteCategory,
    handleEditClick,
    handleSaveClick,
    handleKeyPress,
    handleKeyPressEdit,
    handleCancel,
    handleConfirm,
    loading,
  };
};

export default useCategoriesIndex;
