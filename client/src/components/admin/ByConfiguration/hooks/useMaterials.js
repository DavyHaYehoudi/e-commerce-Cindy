import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMaterial,
  deleteMaterial,
  materialIdToRemove,
  updateMaterial,
} from "../../../../features/admin/materialSlice";
import useUnauthorizedRedirect from "../../../../services/errors/useUnauthorizedRedirect";

const useMaterials = () => {
  const [editMaterialId, setEditMaterialId] = useState(null);
  const [editedMaterial, setEditedMaterial] = useState({ name: "", value: "" });
  const [newMaterial, setNewMaterial] = useState({
    name: "",
    value: "#cc0000",
  });
  const [openModal, setOpenModal] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [productsLinkedToMaterialId, setProductsLinkedToMaterialId] =
    useState([]);
  const materialsStore = useSelector((state) => state?.material?.data);
  const productsStore=useSelector(state=>state?.product?.data)
  const materialId = useSelector(state=>state?.material?.materialId)
  const handleUnauthorized = useUnauthorizedRedirect();
  const dispatch = useDispatch();

  const handleChange = (e, type, isEdited) => {
    const value = e.target.value;
    const setter = isEdited ? setEditedMaterial : setNewMaterial;
    setter((prevMaterial) => ({ ...prevMaterial, [type]: value }));
  };

  const handleAddMaterial = () => {
    if (newMaterial.name.trim() !== "" && newMaterial.value.trim() !== "") {
      dispatch(addMaterial({ newMaterial, handleUnauthorized }));
      setNewMaterial({ name: "", value: "" });
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddMaterial();
    }
  };

  const handleDeleteMaterial = (materialId) => {
    dispatch(materialIdToRemove(materialId))
    const productsLinkedToMaterialSearch = productsStore.filter(product=>
      product?.materials.some(material=>material._id===materialId)
    )
if(productsLinkedToMaterialSearch.length>0){
  setProductsLinkedToMaterialId(productsLinkedToMaterialSearch)
}
setOpenModal(true)
  };
const handleConfirm =()=>{
  dispatch(deleteMaterial({ materialId, handleUnauthorized }));
  setOpenModal(false)
}
const handleCancel=()=>{
  dispatch(materialIdToRemove(""))
  setOpenModal(false)
}
  const handleEditMaterial = (materialId) => {
    if (
      editedMaterial.name.trim() !== "" ||
      editedMaterial.value.trim() !== ""
    ) {
      dispatch(
        updateMaterial({
          data: { materialId, ...editedMaterial },
          handleUnauthorized,
        })
      );
      setEditMaterialId(null);
      setEditedMaterial({ name: "", value: "" });
    }
  };
  const handleKeyPressEdit = (event, materialId) => {
    if (event.key === "Enter") {
      handleEditMaterial(materialId);
    }
  };

  const handleEditClick = (materialId, materialName, materialValue) => {
    setEditMaterialId(materialId);
    setEditedMaterial({ name: materialName, value: materialValue });
  };

  return {
    editMaterialId,
    editedMaterial,
    newMaterial,
    isContentVisible,
    materialsStore,
    productsLinkedToMaterialId,
    openModal,
    setEditMaterialId,
    setIsContentVisible,
    handleChange,
    handleAddMaterial,
    handleDeleteMaterial,
    handleEditMaterial,
    handleEditClick,
    handleKeyPress,
    handleKeyPressEdit,
    handleCancel,
    handleConfirm
  };
};

export default useMaterials;
