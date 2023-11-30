import { orderStep } from "../constants/orderStep";


export const getStepColor = (step) => {
  switch (step) {
    case orderStep[0].name:
      return getComputedStyle(document.documentElement).getPropertyValue('--warning');
    case orderStep[1].name:
      return getComputedStyle(document.documentElement).getPropertyValue('--primary');
    case orderStep[2].name:
      return getComputedStyle(document.documentElement).getPropertyValue('--success');
    case orderStep[3].name:
      return getComputedStyle(document.documentElement).getPropertyValue('--info');
    case orderStep[4].name:
      return getComputedStyle(document.documentElement).getPropertyValue('--info');
    case orderStep[5].name:
      return getComputedStyle(document.documentElement).getPropertyValue('--success');
    case orderStep[6].name:
      return getComputedStyle(document.documentElement).getPropertyValue('--danger');
    default:
      return getComputedStyle(document.documentElement).getPropertyValue('--dark');
  }
};

