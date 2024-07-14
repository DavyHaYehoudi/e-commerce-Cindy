import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCollection,
  collectionToRemove,
  deleteCollection,
  updateCollection,
} from "../../../../../../features/admin/collectionSlice";
import { Get } from "../../../../../../services/httpMethods";
import { generateFilePath } from "../../../../../../helpers/utils/generateFilePath";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../../../../../firebase";
import useUnauthorizedRedirect from "../../../../../../services/errors/useUnauthorizedRedirect";
import { toast } from "react-toastify";

const useCollections = () => {
  const [editCollectionId, setEditCollectionId] = useState(null);
  const [editedCollectionName, setEditedCollectionName] = useState("");
  const [newCollectionName, setNewCollectionName] = useState("");
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productsLinkedToCollectionId, setProductsLinkedToCollectionId] =
    useState([]);
  const [categoriesLinkedToCollectionId, setCategoriesLinkedToCollectionId] =
    useState([]);
  const [productsLinkedToCategories, setProductsLinkedToCategories] = useState(
    []
  );
  const [productSolded, setProductSolded] = useState([]);
  const collectionsStore = useSelector((state) => state?.collection?.data);
  const collectionId = useSelector((state) => state?.collection?.collectionId);
  const [isStar, setIsStart] = useState(false);
  const productsStore = useSelector((state) => state?.product?.data);
  const orderProductsStore = useSelector((state) => state?.orderProducts?.data);
  const categoriesStore = useSelector((state) => state?.category?.data);
  const nameModal = collectionsStore.find(
    (collection) => collection._id === collectionId
  )?.name;
  const dispatch = useDispatch();
  const handleUnauthorized = useUnauthorizedRedirect();

  const main_image = useSelector((state) => state?.collection?.illustration);
  const collectionIdEdit = useSelector(
    (state) => state?.collection?.collectionIdEdit
  );
  const handleSwitchChange = (isChecked) => {
    setIsStart(isChecked);
  };
  const handleAddCollection = async ({
    mainImageCreate,
    setMainImageCreate,
  }) => {
    if (newCollectionName.trim() === "") {
      return toast.error("Le nom ne peut pas être vide");
    }
    if (newCollectionName.length > 50) {
      return toast.error("Le nom ne peut pas dépasser 50 caractères.");
    }
    if (
      newCollectionName.trim() !== "" &&
      newCollectionName.length <= 50 &&
      mainImageCreate
    ) {
      setLoading(true);
      try {
        await Get("auth/verify-token/admin", null, handleUnauthorized);
        const path = generateFilePath(mainImageCreate, "collections/");
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, mainImageCreate);
        setMainImageCreate(null);
        const formData = {
          name: newCollectionName,
          main_image: path,
          isStar,
        };
        dispatch(addCollection({ formData, handleUnauthorized }));
        setNewCollectionName("");
        setLoading(false);
      } catch (error) {
        console.error(
          "Erreur ajout illustration collection dans firebase storage :",
          error
        );
        setLoading(false);
      }
    }
  };
  const handleKeyPress = ({ event, mainImageCreate, setMainImageCreate }) => {
    if (event.key === "Enter") {
      handleAddCollection({ mainImageCreate, setMainImageCreate });
    }
  };
  const handleDeleteCollection = (collectionId) => {
    dispatch(collectionToRemove(collectionId));
    const productsLinkedToCollectionIdSearch = productsStore.filter(
      (product) => product._collection === collectionId
    );

    const categoriesLinkedToCollectionIdSearch = categoriesStore.filter(
      (category) =>
        category?.parentCollection.some((item) => item === collectionId)
    );

    const productsLinkedToCategoriesSearch = productsStore.filter((product) =>
      categoriesLinkedToCollectionIdSearch.some(
        (item) => item._id === product.category
      )
    );

    if (productsLinkedToCollectionIdSearch.length > 0) {
      setProductsLinkedToCollectionId(productsLinkedToCollectionIdSearch);
      const isProductInOrderProducts = orderProductsStore.filter(
        (orderProduct) =>
          productsLinkedToCollectionIdSearch.some(
            (p) => p._id === orderProduct.productsId
          )
      );
      if (isProductInOrderProducts) {
        setProductSolded(isProductInOrderProducts);
      }
    }
    if (categoriesLinkedToCollectionIdSearch.length > 0) {
      setCategoriesLinkedToCollectionId(categoriesLinkedToCollectionIdSearch);
    }
    if (productsLinkedToCategoriesSearch.length > 0) {
      setProductsLinkedToCategories(productsLinkedToCategoriesSearch);
    }
    setOpenModal(true);
  };

  const handleEditCollection = async ({
    addIllustrationToStorage,
    removeIllustrationToStorage,
    setAddIllustrationToStorage,
    setRemoveIllustrationToStorage,
  }) => {
    if (editedCollectionName.trim() !== "") {
      setLoading(true);
      const formData = {
        name: editedCollectionName,
        main_image,
        isStar,
      };

      try {
        // Vérifier le token avant d'interagir avec Firebase Storage
        await Get("auth/verify-token/admin", null, handleUnauthorized);
        if (addIllustrationToStorage && collectionIdEdit) {
          const { path, file } = addIllustrationToStorage;
          const storageRef = ref(storage, path);
          await uploadBytes(storageRef, file);
          dispatch(
            updateCollection({
              formData,
              collectionId: collectionIdEdit,
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
          "Erreur lors de la mise à jour de l'image collection dans firebase storage :",
          error
        );
        setLoading(false);
      } finally {
        setAddIllustrationToStorage(null);
        setRemoveIllustrationToStorage(null);
        setLoading(false);
      }
      dispatch(
        updateCollection({
          collectionId: editCollectionId,
          formData,
          handleUnauthorized,
        })
      );
      setEditCollectionId(null);
      setEditedCollectionName("");
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
      handleEditCollection({
        addIllustrationToStorage,
        removeIllustrationToStorage,
        setAddIllustrationToStorage,
        setRemoveIllustrationToStorage,
      });
    }
  };

  const handleEditClick = (collectionId, collectionName) => {
    setEditCollectionId(collectionId);
    setEditedCollectionName(collectionName);
  };
  const starStatus = (collectionId) => {
    const isStar = collectionsStore.find(
      (collection) => collection?._id === collectionId
    )?.isStar;
    return isStar;
  };

  const handleSaveClick = ({
    addIllustrationToStorage,
    removeIllustrationToStorage,
    setAddIllustrationToStorage,
    setRemoveIllustrationToStorage,
  }) => {
    if (editedCollectionName.trim() === "") {
      return toast.error("Le nom ne peut pas être vide");
    }
    if (editedCollectionName.length > 50) {
      return toast.error("Le nom ne peut pas dépasser 50 caractères.");
    }
    if (
      editedCollectionName.trim() !== "" &&
      editedCollectionName.length <= 50
    ) {
      handleEditCollection({
        addIllustrationToStorage,
        removeIllustrationToStorage,
        setAddIllustrationToStorage,
        setRemoveIllustrationToStorage,
      });
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
    dispatch(collectionToRemove(""));
    setProductsLinkedToCollectionId([]);
    setCategoriesLinkedToCollectionId([]);
    setProductsLinkedToCategories([]);
    setProductSolded([]);
  };

  const handleConfirm = async () => {
    if (productSolded.length > 0) {
      const formData = { isArchived: true };
      dispatch(
        updateCollection({
          collectionId,
          productSolded,
          formData,
          handleUnauthorized,
        })
      );
    } else {
      const illustrationToRemove = collectionsStore.find(
        (collection) => collection._id === collectionId
      ).main_image;
      const url = await getDownloadURL(ref(storage, illustrationToRemove));
      const imageRef = ref(storage, url);
      await deleteObject(imageRef);
      console.log("Image illustration supprimée avec succès !");

      dispatch(
        deleteCollection({
          collectionId,
          collectionsStore,
          handleUnauthorized,
        })
      );
    }
    dispatch(collectionToRemove(""));
    setProductsLinkedToCollectionId([]);
    setCategoriesLinkedToCollectionId([]);
    setProductsLinkedToCategories([]);
    setProductSolded([]);
    setOpenModal(false);
  };

  return {
    editCollectionId,
    editedCollectionName,
    newCollectionName,
    isContentVisible,
    collectionsStore,
    openModal,
    productsLinkedToCollectionId,
    categoriesLinkedToCollectionId,
    productsLinkedToCategories,
    productSolded,
    nameModal,
    loading,
    handleCancel,
    handleConfirm,
    setEditCollectionId,
    setEditedCollectionName,
    setNewCollectionName,
    setIsContentVisible,
    handleAddCollection,
    handleDeleteCollection,
    handleEditClick,
    handleSaveClick,
    handleKeyPress,
    handleKeyPressEdit,
    handleSwitchChange,
    isStar,
    starStatus,
  };
};

export default useCollections;
