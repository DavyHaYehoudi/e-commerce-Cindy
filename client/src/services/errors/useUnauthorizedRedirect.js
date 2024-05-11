import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToken } from "../../features/authentication/authenticationSlice";

const useUnauthorizedRedirect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUnauthorized = useCallback(() => {
    navigate("/account/login");
    dispatch(addToken(""));
  }, [dispatch, navigate]);

  return handleUnauthorized;
};

export default useUnauthorizedRedirect;
