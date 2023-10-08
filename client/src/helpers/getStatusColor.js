export const getStatusColor = (status) => {
  switch (status) {
    case "En attente":
      return "#FFA500"; // Orange
    case "En cours de préparation":
      return "#007BFF"; // Bleu
    case "Expédiée":
      return "#28A745"; // Vert
    case "Annulée":
      return "#FF0000"; // Rouge
    default:
      return "#000000"; // Noir par défaut
  }
};
