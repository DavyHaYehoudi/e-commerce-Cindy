import { orderStep } from "../../constants/orderStep";

export const getOrderStepProperty = (orderStepId) => {
  const step = orderStep.find((os) => os.id === orderStepId);
  return step;
};
