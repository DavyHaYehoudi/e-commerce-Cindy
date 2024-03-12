export const formattedDataClient = (inputObject) => {
  const formattedData = {
    steps: [],
  };

  for (const key in inputObject) {
    // Vérification si la clé est un nombre
    if (!isNaN(key)) {
      if (inputObject[key]) {
        formattedData.steps.push(key);
      }
    } else {
      if (inputObject[key]) {
        formattedData[key] = true;
      } else {
        delete formattedData[key];
      }
    }
  }

  console.log('formattedData:', formattedData)
  return formattedData;
};
