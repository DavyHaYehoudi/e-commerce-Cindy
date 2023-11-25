import { getStepColor } from "./getStepColor";

// Informations relatives à une commande en particulier
export const getOrderInfo = (state, clientId, orderId) => {
  const order = state
    .find((user) => user.id === clientId)
    ?.orders.find((order) => order.id === orderId);
  return order;
};

// Toutes les propriétés du modèle produit
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

// Informations relatives aux produits, que ce soit sur plusieurs produits d'une même commande ou bien sur un produit en particulier
export const getProductStateInfo = (state, clientId, orderId, productId) => {
  const productState = state
    .find((user) => user.id === clientId)
    ?.orders.find((order) => order.id === orderId)
    ?.products.find((prod) => prod.productId === productId)?.productActions;

  const isAnyProductClientNotified = state
    .find((user) => user.id === clientId)
    ?.orders.find((order) => order.id === orderId)
    .products?.some((product) => !product.isClientNotified);

  const noteContent = productState?.note;
  const isTagProductExisted =
    productState?.exchange || productState?.refund || productState?.credit;
  return {
    productState,
    noteContent,
    isTagProductExisted,
    isAnyProductClientNotified,
  };
};
// Nombre de mêmes articles achetés dans la même commande
export const getArticleNumberByProduct = (
  state,
  clientId,
  orderId,
  productId
) => {
  const productState = state
    .find((user) => user.id === clientId)
    ?.orders.find((order) => order.id === orderId)
    ?.products.find((prod) => prod.productId === productId);

  const articleNumber = parseInt(productState?.quantity);
  return { articleNumber };
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

  const renderBadge = (step) => {
    const count = orders?.filter((order) => order.step === step).length;

    if (count > 0) {
      const stepColor = getStepColor(step);
      const badgeClass = `admin-badge`;
      const style = { backgroundColor: stepColor };

      return {
        stepBadge: (
          <span key={step} className={badgeClass} style={style}>
            {step} ({count})
          </span>
        ),
      };
    }

    return { stepBadge: null };
  };

  return { orders, isAnyOrderClientNotified, renderBadge };
};
