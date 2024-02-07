import React from "react";
import ToggleButton from "../../../../../shared/ToggleButton";
import { useDispatch} from "react-redux";
import { updateActionContent } from "../../../../../features/admin/productsByOrderSlice";

const ToggleButtonNote = ({ productsByOrderInfo, productsByOrder }) => {
  const dispatch = useDispatch();

  const handleChangeNoteValue = (e) => {
    dispatch(
      updateActionContent({
        productsByOrderId: productsByOrder._id,
        updatedProperty: "note",
        productActionContent:e.target.value
      })
    );
  };
  return (
    <ToggleButton
      initialText="Note"
      hiddenText="Fermer"
      buttonClass="account-btn toggle"
      content={
        <div className="product-note-wrapper">
          <textarea
            className="product-note"
            value={productsByOrderInfo?.note || ""}
            onChange={e=> handleChangeNoteValue(e)}
          >
            {" "}
          </textarea>
        </div>
      }
    />
  );
};

export default ToggleButtonNote;
