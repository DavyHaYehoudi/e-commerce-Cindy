// Informations relatives à une commande en particulier
export const getOrderInfo = (state, clientId, orderId) => {
  const order = state
    .find((user) => user.id === clientId)
    ?.orders.find((order) => order.id === orderId);
  return order;
};

// Toutes les propriétés du modèle produit en général
export const getProductProperties = (productId, state) => {
  const product = state.find((product) => product.id === productId);

  if (product) {
    const {
      id,
      reference,
      category,
      releaseDate,
      name,
      image,
      description,
      materials,
      promotion,
      pricing,
      stock,
      ratings,
      options,
      tags,
      isNew,
    } = product;

    return {
      id,
      reference,
      category,
      releaseDate,
      name,
      image,
      description,
      materials,
      promotion,
      pricing,
      stock,
      ratings,
      options,
      tags,
      isNew,
    };
  }

  return {};
};
// ************* Informations sur les caractéristiques du produit : matériau, les actions en cas de retour, quantité d'articles *************
// productsActions
export const getProductStateInfo = (state, clientId, orderId, productId) => {
  const productState = state
    .find((user) => user.id === clientId)
    ?.orders.find((order) => order.id === orderId)
    ?.products?.find((prod) => prod.productId === productId)?.productsActions;

  const isAnyProductClientNotified = state
    .find((user) => user.id === clientId)
    ?.orders.find((order) => order.id === orderId)
    .products?.some((product) => !product.isClientNotified);

  const productsByOrder = state
    .find((user) => user.id === clientId)
    ?.orders.find((order) => order.id === orderId)?.products;

  const noteContent = productState?.note;
  const isTagProductExisted =
    productState?.exchange || productState?.refund || productState?.credit;
  return {
    productState,
    isAnyProductClientNotified,
    productsByOrder,
    noteContent,
    isTagProductExisted,
  };
};
// Nombre d'articles et matériau
export const getProductDetails = (state, clientId, orderId, productId) => {
  const productState = state
    .find((user) => user.id === clientId)
    ?.orders.find((order) => order.id === orderId)
    ?.products.find((prod) => prod.productId === productId);

  const articleNumber = parseInt(productState?.quantity);
  const material = productState?.material;
  return { articleNumber, material };
};

// Récupération du contenu des notes
export const getNotesEditorInfo = (state, clientId, notesPropName) => {
  const user = state.find((user) => user.id === clientId);
  const notes = user?.[notesPropName] || [];

  return { user, notes };
};

// Informations relatives aux commandes : total par catégorie - client notifié des changements
export const getClientItemInfo = (state, client) => {
  const orders = state.find((user) => user.id === client.id)?.orders;
  const isAnyOrderClientNotified = orders?.some(
    (order) => !order.isClientNotified
  );
  return { orders, isAnyOrderClientNotified };
};
// Récupération des numéros de suivi par commande
export const getTrackingNumberList = (state, clientId, orderId) => {
  const trackingNumberList = state
    .find((user) => user.id === clientId)
    ?.orders?.find((order) => order.id === orderId)?.trackingNumber;
  return trackingNumberList;
};
