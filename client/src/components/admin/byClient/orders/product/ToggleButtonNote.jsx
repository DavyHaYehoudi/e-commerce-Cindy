import React from "react";
import ToggleButton from "../../../../../shared/ToggleButton";
import { useDispatch } from "react-redux";
import { handleChangeNoteValue } from "./item/action/handler/notes";

const ToggleButtonNote = ({
  productsInfo,
  client,
  productId,
  orderId,
  actions,
}) => {
  const dispatch = useDispatch();
  return (
    <ToggleButton
      initialText="Note"
      hiddenText="Fermer"
      buttonClass="account-btn toggle"
      content={
        <div>
          <textarea
            className="product-note"
            value={productsInfo?.note || ""}
            onChange={(e) =>
              handleChangeNoteValue(
                e,
                dispatch,
                client.id,
                productId,
                orderId,
                actions
              )
            }
          >
            {" "}
          </textarea>
        </div>
      }
    />
  );
};

export default ToggleButtonNote;
