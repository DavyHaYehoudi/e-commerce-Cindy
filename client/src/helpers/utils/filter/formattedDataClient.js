export const formattedDataClient = (inputObject) => {
  const formattedData = {
    steps: [],
  };

  // Parcours des clés de l'objet
  for (const key in inputObject) {
    // Vérification si la clé est un nombre
    if (!isNaN(key)) {
      if (inputObject[key]) {
        // Ajout de la valeur au tableau 'steps'
        formattedData.steps.push(key);
      }
    } else {
      // Ajout de la clé directement
      formattedData[key] = true;
    }
  }

  return formattedData;
};