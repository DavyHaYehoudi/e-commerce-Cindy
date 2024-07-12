import { useState } from "react";
import { useDispatch } from "react-redux";
import { formattedDataClient } from "../../../utils/formattedDataClient";
import { fetchClients } from "../../../../../../../features/admin/clientsSlice";

const useFilter = (itemsPerPage, setSearchBarValue) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [preciseDate, setPreciseDate] = useState("");
  const [rangeDate, setRangeDate] = useState({ start: "", end: "" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const dispatch = useDispatch();

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [name]: checked,
    }));
    setPreciseDate("");
    setRangeDate({});
    setSelectedOption("");
  };

  const handlePreciseDateChange = (event) => {
    setPreciseDate(event.target.value);
  };

  const handleRangeDateChange = (event, limit) => {
    setRangeDate({ ...rangeDate, [limit]: event.target.value });
  };
  const handleChangeOrderNumber = (e) => {
    setOrderNumber(e.target.value);
  };

  const handleValidation = () => {
    const { steps, credit, refund, exchange, trackingNumber, note } =
      formattedDataClient(checkedItems);

    dispatch(
      fetchClients({
        itemsPerPage: -1,
        steps,
        credit,
        refund,
        exchange,
        trackingNumber,
        note,
        preciseDate,
        rangeDateStart: rangeDate.start,
        rangeDateEnd: rangeDate.end,
        orderNumber,
      })
    );
    setIsFilterOpen(false);
    setSearchBarValue("");
    setOrderNumber("");
  };

  const handleReset = () => {
    setCheckedItems({});
    setRangeDate({});
    setPreciseDate("");
    setSelectedOption("");
    setOrderNumber("");
    setIsFilterOpen((prevState) => !prevState);
    dispatch(
      fetchClients({
        itemsPerPage,
      })
    );
  };

  const toggleFilter = () => {
    setIsFilterOpen((prevState) => !prevState);
    setCheckedItems({});
    setRangeDate({});
    setPreciseDate("");
    setSelectedOption("");
  };

  const isValidationButtonDisabled =
    !Object.values(checkedItems).some((value) => value === true) &&
    preciseDate === "" &&
    !rangeDate.start &&
    !rangeDate.end &&
    !orderNumber;

  const validationButtonClass = isValidationButtonDisabled
    ? "account-btn"
    : "account-btn validate-btn";

  return {
    checkedItems,
    setCheckedItems,
    preciseDate,
    setPreciseDate,
    rangeDate,
    setRangeDate,
    isFilterOpen,
    selectedOption,
    setSelectedOption,
    handleCheckboxChange,
    handlePreciseDateChange,
    handleRangeDateChange,
    handleValidation,
    handleReset,
    setIsFilterOpen,
    toggleFilter,
    isValidationButtonDisabled,
    validationButtonClass,
    handleChangeOrderNumber,
    orderNumber,
  };
};

export default useFilter;
