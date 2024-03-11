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
      // Ajout de la clé directement si sa valeur est true
      if (inputObject[key]) {
        formattedData[key] = true;
      } else {
        // Suppression de la clé si sa valeur est false
        delete formattedData[key];
      }
    }
  }

  return formattedData;
};
