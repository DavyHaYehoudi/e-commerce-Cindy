const formatPromotionDate = (promoEndDate) => {
    const now = new Date();
    const promoDate = new Date(promoEndDate);
    const timeDiff = promoDate - now;
  
    const oneDay = 1000 * 60 * 60 * 24;
    const oneHour = 1000 * 60 * 60;
    const oneMinute = 1000 * 60;
  
  if (timeDiff <= oneHour) {
      const minutesLeft = Math.floor(timeDiff / oneMinute);
      return `Encore ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}`;
    } else if (timeDiff <= oneDay) {
      const hoursLeft = Math.floor(timeDiff / oneHour);
      return `Encore ${hoursLeft} heure${hoursLeft > 1 ? 's' : ''}`;
    } else if (timeDiff <= oneDay * 7) {
      const daysLeft = Math.floor(timeDiff / oneDay);
      return `Plus que ${daysLeft} jour${daysLeft > 1 ? 's' : ''}`;
    } else {
      // Si la date est éloignée, formatez-la comme une date classique
      return `Jusqu'au ${promoDate.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}`;
    }
  };

  export default formatPromotionDate;