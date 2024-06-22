import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProduct } from "../features/admin/productSlice";
import { fetchMaterials } from "../features/admin/materialSlice";
import { fetchCollections } from "../features/admin/collectionSlice";
import { fetchTags } from "../features/admin/tagSlice";
import { fetchCategories } from "../features/admin/categorySlice";
import { fetchCustomer } from "../features/accountClient/customerSlice";
import {
  addRole,
  addToken,
} from "../features/authentication/authenticationSlice";
import { initCart, initWishlist } from "../features/visitUser/visitUserSlice";

const useFetchData = ({ role, clientId }) => {
  // console.log("clientId:", clientId);
  // console.log("role:", role);
  const dispatch = useDispatch();

  const fetchSliceVisit = useCallback(() => {
    dispatch(fetchProduct());
    dispatch(fetchMaterials());
    dispatch(fetchCollections());
    dispatch(fetchTags());
    dispatch(fetchCategories());
  }, [dispatch]);

  const fetchSliceCustomer = useCallback(() => {
    dispatch(fetchCustomer({ clientId }));
    dispatch(fetchProduct());
    dispatch(fetchMaterials());
    dispatch(fetchCollections());
    dispatch(fetchTags());
    dispatch(fetchCategories());
  }, [dispatch, clientId]);

  useEffect(() => {
    if (role === "user" || role === "admin") {
      const token = localStorage.getItem("token");
      const tokenParse = JSON.parse(atob(token.split(".")[1]));
      dispatch(addToken(token));
      dispatch(addRole(tokenParse?.role));
    }
    if (role === "user") {
      fetchSliceCustomer();
    } else if (role !== "user" || role === "admin") {
      fetchSliceVisit();
    }
  }, [fetchSliceVisit, fetchSliceCustomer, role, dispatch]);

  //Data visitor
  useEffect(() => {
    const cartProductsString = localStorage.getItem("cartProducts");
    const cartProducts = cartProductsString
      ? JSON.parse(cartProductsString)
      : [];
    dispatch(initCart(cartProducts));
    const likedProductsString = localStorage.getItem("likedProducts");
    const likedProducts = likedProductsString
      ? JSON.parse(likedProductsString)
      : [];
    dispatch(initWishlist(likedProducts));
  }, [dispatch]);

  return fetchSliceVisit;
};

export default useFetchData;
