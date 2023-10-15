import React from "react";
import { getStepColor } from "../../../helpers/getStepColor";

const orderStep = ({ order }) => {
  const StepColorStyle = {
    backgroundColor: getStepColor(order.step),
    color: "#fff",
    padding: "5px",
    borderRadius: "5px",
  };

  return (
    <p>
      <span style={StepColorStyle}>{order.step}</span>
    </p>
  );
};

export default orderStep;
