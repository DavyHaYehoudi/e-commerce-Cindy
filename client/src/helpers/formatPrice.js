export function formatPrice(number) {
    // Vérifier si le nombre est un entier ou a des décimales
    const isInteger = Number.isInteger(number);
  
    // Si c'est un entier, ajouter deux décimales
    if (isInteger) {
        return `${number.toFixed(2).replace('.', ',')} €`;
      } else {
        // Si c'est un décimal, ajoute un 0 pour compléter jusqu'au centième avec une virgule comme séparateur
        return `${number.toFixed(2).replace('.', ',')} €`;
      }
  }

  export function sumPriceArticle(quantity, price) {
    const total = quantity * price;
    const formattedTotal = formatPrice(total);
    return `${quantity} x ${formatPrice(price)} = ${formattedTotal}`;
  }
