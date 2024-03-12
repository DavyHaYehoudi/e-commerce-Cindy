
export const buildOrderProductsQuery = ( credit, exchange, refund ) => {
  console.log('buildOrderProductsQuery:')
  let query ={};

  // Ajouter les critères à la requête en fonction de leur existence
  if (credit.trim() !== "") {
    query.$or = query.$or || [];
    query.$or.push({
      "orderProductsActions.credit": { $ne: null },
    });
  }
  if (exchange.trim() !== "") {
    query.$or = query.$or || [];
    query.$or.push({
      "orderProductsActions.exchange": { $ne: null },
    });
  }
  if (refund.trim() !== "") {
    query.$or = query.$or || [];
    query.$or.push({
      "orderProductsActions.refund": { $ne: null },
    });
  }

  console.log('*************** query dans buildOrderProductsQuery *************:', query)
  return query;
};
