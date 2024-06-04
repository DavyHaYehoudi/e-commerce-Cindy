import { useSelector } from "react-redux";
import useAuthWrappers from "../../useAuthWrappers";

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
  const cartStoreVisitorFilter = filterStore({
    store: cartStoreVisitor,
    productsStore,
  });
  const wishlistClient =
    useSelector((state) => state?.customer?.data?.client?.wishlist) || [];
  const wishlistClientFilter = filterStore({
    store: wishlistClient,
    productsStore,
  });
  const wishlistVisitor = useSelector(
    (state) => state?.visitUser?.wishlist || []
  );
  const wishlistVisitorFilter = filterStore({
    store: wishlistVisitor,
    productsStore,
  });

  const wishlist = clientId ? wishlistClientFilter : wishlistVisitorFilter;
  const cartStore = clientId ? cartStoreClientFilter : cartStoreVisitorFilter;

  const isLiked = findIsLiked(wishlist, productsId, material);
  const isProductInCart = cartStore.find(
    (product) =>
      product.productsId === productsId && product?.material === material
  );
  return {
    clientId,
    isLiked,
    isProductInCart,
    cartStore,
    wishlistClient: wishlistClientFilter,
    wishlist,
  };
};
export default useStoreInfo;
