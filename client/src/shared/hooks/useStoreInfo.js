import { useSelector } from "react-redux";
import useAuthWrappers from "../../config/useAuthWrappers";

const findIsLiked = (wishlistStore, productId, materialId) => {
  return wishlistStore.find((product) => {
    if (materialId) {
      return (
        product?.productsId === productId && product?.material === materialId
      );
    } else {
      return product?.productsId === productId;
    }
  });
};
const filterStore = ({ store = [], productsStore }) => {
  return store.filter((item) =>
    productsStore.some(
      (ps) =>
        ps._id === item?.productsId &&
        !ps?.isArchived &&
        ps?.isActive &&
        ps?.materials.some(
          (mat) =>
            mat?._id === item?.material && mat?.isActive && !mat?.isArchived
        )
    )
  );
};
const quantityProduct = (store = [], productId, materialId) => {
  const product = store.find(
    (product) =>
      product?.productsId === productId && product?.material === materialId
  );
  return product?.quantity || 1;
};
const calculateTotalCartPrice = (cartStore = [], productsStore = []) => {
    return cartStore.reduce((total, cartItem) => {
      const product = productsStore.find(product => product?._id === cartItem?.productsId);
      if (product) {
        const material = product?.materials?.find(mat => mat?._id === cartItem?.material);
        const price = material?.pricing?.currentPrice ?? product?.materials?.[0]?.pricing?.currentPrice;
        total += (price || 0) * (cartItem?.quantity || 0);
      }
      return total;
    }, 0);
  };

const useStoreInfo = ({ productsId, material }) => {
  const { clientId: getClientId } = useAuthWrappers();
  const clientId = getClientId();
  const productsStore = useSelector((state) => state?.product?.data);

  const cartStoreClient =
    useSelector((state) => state?.customer?.data?.client?.cart) || [];
  const cartStoreClientFilter = filterStore({
    store: cartStoreClient,
    productsStore,
  });
  const cartStoreVisitor = useSelector((state) => state?.visitUser?.cart) || [];
  const cartStoreVisitorFilter =
    filterStore({
      store: cartStoreVisitor,
      productsStore,
    }) || [];
  const wishlistClient =
    useSelector((state) => state?.customer?.data?.client?.wishlist) || [];
  const wishlistClientFilter =
    filterStore({
      store: wishlistClient,
      productsStore,
    }) || [];
  const wishlistVisitor = useSelector(
    (state) => state?.visitUser?.wishlist || []
  );
  const wishlistVisitorFilter =
    filterStore({
      store: wishlistVisitor,
      productsStore,
    }) || [];
  const quantityProductClient = quantityProduct(
    cartStoreClientFilter,
    productsId,
    material
  );
  const quantityProductVisitor = quantityProduct(
    cartStoreVisitorFilter,
    productsId,
    material
  );

  const wishlist = clientId ? wishlistClientFilter : wishlistVisitorFilter;
  const cartStore = clientId ? cartStoreClientFilter : cartStoreVisitorFilter;
  const quantity = clientId ? quantityProductClient : quantityProductVisitor;

  const isLiked = findIsLiked(wishlist, productsId, material);
  const isProductInCart = cartStore.find(
      (product) =>
        product.productsId === productsId && product?.material === material
    );
  const numberArticleInCart = cartStore.reduce((a, b) => a + b.quantity, 0);
  const cartTotalAmount = calculateTotalCartPrice(cartStore,productsStore)
  const numberArticleInWihslist = wishlist.length

  return {
    clientId,
    isLiked,
    isProductInCart, 
    cartStore,
    wishlistClient: wishlistClientFilter,
    wishlist,
    quantity,
    numberArticleInCart,
    cartTotalAmount,
    numberArticleInWihslist
  };
};
export default useStoreInfo;
