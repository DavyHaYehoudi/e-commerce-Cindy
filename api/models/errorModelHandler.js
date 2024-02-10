export const handleValidationErrors = (error, modelName) => {
    console.error(`Erreur de validation dans le modèle ${modelName}:`, error.message);
    // Vous pouvez également effectuer d'autres actions, comme envoyer des notifications, etc.
  };
  
  