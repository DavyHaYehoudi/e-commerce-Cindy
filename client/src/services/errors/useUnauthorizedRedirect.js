import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToken } from "../../features/authentication/authenticationSlice";

const useUnauthorizedRedirect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUnauthorized = () => {
    navigate("/account/login");
    dispatch(addToken(""));
  };

  return handleUnauthorized;
};

export default useUnauthorizedRedirect;
