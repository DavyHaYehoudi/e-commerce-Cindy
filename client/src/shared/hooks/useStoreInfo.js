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
const filterStore = ({ store = [], productsStoreFixed }) => {
  return store.filter((item) =>
    productsStoreFixed.some(
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
const stockProduct = (store = [], productId, materialId) => {
  const product = store.find((product) => product?._id === productId);
  if (!product) {
    return null;
  }
  let material;
  if (materialId) {
    material = product.materials.find(
      (m) => m._id?.toString() === materialId.toString()
    );
  } else if (product.materials.length === 1) {
    material = product.materials[0];
  }
  if (!material) {
    return null;
  }
  return material.stock;
};
const calculateTotalCartPrice = (cartStore = [], productsStoreFixed = []) => {
  return cartStore.reduce((total, cartItem) => {
    const product = productsStoreFixed.find(
      (product) => product?._id === cartItem?.productsId
    );
    if (product) {
      const material = product?.materials?.find((mat) => {
        if (mat?._id) {
          return mat?._id === cartItem?.material; 
        }
        return product?.materials?.[0];
      });
      let price = material?.pricing?.currentPrice;
      if (
        material?.promotion?.endDate &&
        new Date(material?.promotion.endDate) > new Date()
      ) {
        price -= (price * material?.promotion?.amount) / 100;
      }

      total += (price || 0) * (cartItem?.quantity || 0);
    }
    return total;
  }, 0);
};

const useStoreInfo = ({ productsId, material }) => {
  const { clientId: getClientId, role: getRole } = useAuthWrappers();
  const clientId = getClientId();
  const role = getRole();
  const productsStoreFixed = useSelector(state=>state?.productsFixed?.data)

  const cartStoreClient =
    useSelector((state) => state?.customer?.data?.client?.cart) || [];
  const cartStoreClientFilter = filterStore({
    store: cartStoreClient,
    productsStoreFixed,
  });
  const cartStoreVisitor = useSelector((state) => state?.visitUser?.cart) || [];
  const cartStoreVisitorFilter =
    filterStore({
      store: cartStoreVisitor,
      productsStoreFixed,
    }) || [];
  const wishlistClient =
    useSelector((state) => state?.customer?.data?.client?.wishlist) || [];
  const wishlistClientFilter =
    filterStore({
      store: wishlistClient,
      productsStoreFixed,
    }) || [];
  const wishlistVisitor = useSelector(
    (state) => state?.visitUser?.wishlist || []
  );
  const wishlistVisitorFilter =
    filterStore({
      store: wishlistVisitor,
      productsStoreFixed,
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
  const cartTotalAmount = calculateTotalCartPrice(cartStore, productsStoreFixed);
  const numberArticleInWishlist = wishlist.length;
  const stockMaxProduct = stockProduct(productsStoreFixed, productsId, material);

  return {
    clientId,
    role,
    isLiked,
    isProductInCart,
    cartStore,
    wishlistClient: wishlistClientFilter,
    wishlist,
    quantity,
    numberArticleInCart,
    cartTotalAmount,
    numberArticleInWishlist,
    stockMaxProduct,
  };
};
export default useStoreInfo;
