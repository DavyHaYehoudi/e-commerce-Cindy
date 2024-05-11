import { useState } from "react";
import { useDispatch } from "react-redux";
import { orderProductsNote, updateActionContent } from "../../../../../../../features/admin/orderProductsSlice";
import useUnauthorizedRedirect from "../../../../../../../services/errors/useUnauthorizedRedirect";


const useToggleButtonNote = (orderProductsInfo, orderProducts) => {
  const [isEdited, setIsEdited] = useState(false);
  const handleUnauthorized=useUnauthorizedRedirect()
  const dispatch = useDispatch();

  const handleChangeNoteValue = (e) => {
    setIsEdited(true);
    const enteredText = e.target.value;
    if (enteredText.length <= 500) {
      dispatch(
        updateActionContent({
          orderProductsId: orderProducts._id,
          updatedProperty: "note",
          productActionContent: e.target.value,
        })
      );
    }
  };

  const handleNoteValidate = () => {
    setIsEdited(false);
    dispatch(
      orderProductsNote({
        orderProductsId: orderProducts._id,
        content: orderProductsInfo?.note,
        handleUnauthorized
      })
    );
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
        handleNoteValidate();
    }
  };

  return {
    isEdited,
    handleChangeNoteValue,
    handleNoteValidate,
    handleKeyPress
  };
};

export default useToggleButtonNote;
