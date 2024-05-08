import { useNavigate } from "react-router-dom";

const useUnauthorizedRedirect = () => {
  const navigate = useNavigate();

  const handleUnauthorized = () => {
    navigate("/account/login");
  };

  return handleUnauthorized;
};

export default useUnauthorizedRedirect;
