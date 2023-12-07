import { useDispatch } from "react-redux";
import { updateActionContent } from "../../../../../../../../features/admin/productsSlice";

export const useNoteValueHandler = (productId, actions) => {
  const dispatch = useDispatch();

  const handleChangeNoteValue = (e) => {
    dispatch(
      updateActionContent({
        productId,
        updatedProperty: actions.NOTE,
        productActionContent: e.target.value,
      })
    );
  };

  return { handleChangeNoteValue };
};
