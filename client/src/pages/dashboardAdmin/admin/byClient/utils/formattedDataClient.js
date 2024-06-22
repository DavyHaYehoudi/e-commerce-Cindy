import { orderStep } from "../../../../../constants/orderStep";

export const formattedDataClient = (inputObject) => {
  const stepsConstants = orderStep;
  const options = [
    { name: "Avoir", label: "credit" },
    { name: "Remboursement", label: "refund" },
    { name: "Echange", label: "exchange" },
    { name: "Numéro de suivi", label: "trackingNumber" },
    { name: "Note", label: "note" },
  ];

  // console.log("inputObject:", inputObject);

  const formattedData = {
    steps: [],
  };

  Object.keys(inputObject).forEach((key) => {
    const isStep = stepsConstants.find(
      (item) => item.name === key && inputObject[key]
    );
    const isOption = options.find(
      (item) => item.name === key && inputObject[key]
    );

    if (isStep) {
      formattedData.steps.push(isStep.id);
    } else if (isOption) {
      formattedData[isOption.label] = true;
    } else {
      options.forEach((item) => {
        if (formattedData[item.label] && !inputObject[key]) {
          delete formattedData[item.label];
        }
      });
    }
  });

  // console.log("formattedData:", formattedData);
  return formattedData;
};
