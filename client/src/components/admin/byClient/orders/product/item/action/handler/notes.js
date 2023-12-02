import { updateActionContent } from "../../../../../../../../features/admin/productsActionsSlice";

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
