import { useState } from "react";
import { useDispatch } from "react-redux";
import { modifyProductCheet } from "../../../../../../../features/admin/productSlice";

const useFormFields = (initialState) => {
  const [fields, setFields] = useState(initialState);
  const dispatch = useDispatch();

  const handleChangeFields = (e, field) => {
    const value = e.target.value;
    setFields({ ...fields, [field]: value });
    dispatch(modifyProductCheet(true));
  };

  return { fields, handleChangeFields };
};

export default useFormFields;
