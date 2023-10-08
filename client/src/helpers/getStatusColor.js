export const getStatusColor = (status) => {
    switch (status) {
      case "En attente":
        return "#FFA500"; // Orange
      case "En cours de préparation":
        return "#008000"; // Vert
      case "Expédiée":
        return "#0000FF"; // Bleu
      case "Livraison en cours":
        return "#800080"; // Violet
      case "Livrée":
        return "#008000"; // Vert 
      default:
        return "#000000"; // Noir par défaut
    }
  };