export const validateMainFields =(fieldName, value)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (["firstName", "lastName", "email"].includes(fieldName)) {
        // Validation spécifique pour les champs de profil
        if (fieldName === "email") {
          return emailRegex.test(value);
        } else {
          return value.trim() !== "";
        }
      }
      // Ne pas appliquer de validation pour les autres champs
      return true;
    
}

