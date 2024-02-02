import { useDispatch } from "react-redux";
import {
  productsByOrderNotes,
} from "../../../../../../../../features/admin/productsByOrderSlice";

export const useNoteValueHandler = (productsByOrder, setToSave) => {
  const dispatch = useDispatch();

  const handleChangeNoteValue = (e) => {
    setToSave(true);
    dispatch(
      productsByOrderNotes({
        content: e.target.value,
        productsByOrderId: productsByOrder._id,
      })
    );
  };

  return { handleChangeNoteValue };
};
