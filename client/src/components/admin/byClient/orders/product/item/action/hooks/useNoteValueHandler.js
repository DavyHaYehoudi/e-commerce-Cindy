import { useDispatch } from "react-redux";
import { updateActionContent } from "../../../../../../../../features/admin/productsByOrderSlice";

export const useNoteValueHandler = (actions,productsByOrder) => {
  const dispatch = useDispatch();

  const handleChangeNoteValue = (e) => {
    dispatch(
      updateActionContent({
        updatedProperty: actions.NOTE,
        productActionContent: e.target.value,
        productsByOrderId: productsByOrder._id,
      })
    );
  };

  return { handleChangeNoteValue };
};
