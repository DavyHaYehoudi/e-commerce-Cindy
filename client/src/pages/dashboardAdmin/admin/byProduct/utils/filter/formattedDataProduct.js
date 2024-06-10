export const formattedDataProduct = (
  data,
  collectionSelected,
  categoriesStore,
  collectionsStore
) => {
  const formattedData = {
    collection: null,
    categories: [],
    other: [],
  };

  // Trouver la collection sélectionnée dans collectionsStore
  const selectedCollection = collectionsStore.find(
    (item) => item?.name === collectionSelected
  );

  // Si une collection correspondante est trouvée, la définir dans formattedData
  if (selectedCollection) {
    formattedData.collection = selectedCollection._id;
  }

  // Parcourir toutes les clés de l'objet data
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      // Vérifier si la clé de data correspond à une propriété 'name' dans categoriesStore
      const categoryMatch = categoriesStore.find((item) => item?.name === key);
      if (categoryMatch) {
        formattedData.categories.push(categoryMatch?._id);
      } else {
        // Si la clé de data ne correspond à aucune propriété dans categoriesStore,
        // ajouter la clé à la propriété other de formattedData
        let rename;
        if (key === "En promotion") {
          rename = "promotion";
        }
        if (key === "Nouveau") {
          rename = "untilNew";
        }
        if (key === "Suspendu") {
          rename = "pending";
        }
        formattedData.other.push(rename);
      }
    }
  }

  // console.log("formattedData:", formattedData);
  return formattedData;
};
