import { getStepColor } from "./getStepColor";

export const getProductProperties = (productId, state) => {
  const product = state.products.find((product) => product.id === productId);

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

  return null;
};

export const getProductStateInfo = (state, clientId, orderId, productId) => {
  const productState = state.productActions
    .find((user) => user.id === clientId)
    ?.orders.find((order) => order.id === orderId)
    ?.products.find((prod) => prod.id === productId)?.productActions;

  const noteContent = productState?.addNoteProduct;
  const isTagProductExisted =
    productState?.exchange || productState?.refund || productState?.generateCredit;

  return { productState, noteContent, isTagProductExisted };
};

export const getNotesEditorInfo = (state, clientId, notesPropName) => {
  const user = state.notes.find((user) => user.id === clientId);
  const notes = user?.[notesPropName] || [];

  return { user, notes };
};

export const getClientItemInfo = (state, client) => {
  const ordersStep = state.ordersStep.find((user) => user.id === client.id)?.orders;
  const isAnyOrderClientNotified = ordersStep?.some((order) => !order.isClientNotified);

  const renderBadge = (step) => {
    const count = ordersStep?.filter((order) => order.step === step).length;

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

  return { ordersStep, isAnyOrderClientNotified, renderBadge };
};
