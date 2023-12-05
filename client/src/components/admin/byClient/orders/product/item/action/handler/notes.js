import { updateActionContent } from "../../../../../../../../features/admin/productsSlice";

export const handleChangeNoteValue = (e, dispatch, productId, actions) => {
  dispatch(
    updateActionContent({
      productId,
      updatedProperty: actions.NOTE,
      productActionContent: e.target.value,
    })
  );
};
