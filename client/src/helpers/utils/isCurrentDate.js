const isCurrent = (date) => {
    const dateData = new Date(date);
    const currentDate = new Date();
    return dateData > currentDate;
  };
  export default isCurrent