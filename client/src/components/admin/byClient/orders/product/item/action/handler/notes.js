import { updateActionContent } from "../../../../../../../../features/admin/productActionsSlice";

export const handleChangeNoteValue = (e, dispatch, clientId, productId, orderId, actions) => {
  dispatch(
    updateActionContent({
      clientId,
      productId,
      orderId,
      updatedProperty: actions.NOTE,
      productActionContent: e.target.value,
    })
  );
};
