import { useState } from "react";

const useFormFields = (initialState) => {
  const [fields, setFields] = useState(initialState);

  const handleChangeFields = (e, field) => {
    const value = e.target.value ;
    setFields({ ...fields, [field]: value });
  };

  const resetFields = () => {
    setFields(initialState);
  };

  return { fields, handleChangeFields, resetFields };
};

export default useFormFields;
