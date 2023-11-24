import { getStepColor } from "./getStepColor";

export const getOrderInfo = (state, clientId, orderId) => {
  const order = state
  .find((user) => user.id === clientId)
  ?.orders.find((order) => order.id === orderId)
  return order;
};

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

export const getProductStateInfo = (state, clientId, orderId, productId) => {
  const productState = state
    .find((user) => user.id === clientId)
    ?.orders.find((order) => order.id === orderId)
    ?.products.find((prod) => prod.productId === productId)?.productActions;

  const noteContent = productState?.note;
  const isTagProductExisted =
    productState?.exchange || productState?.refund || productState?.credit;

  return { productState, noteContent, isTagProductExisted };
};
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

export const getNotesEditorInfo = (state, clientId, notesPropName) => {
  const user = state.find((user) => user.id === clientId);
  const notes = user?.[notesPropName] || [];

  return { user, notes };
};

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
