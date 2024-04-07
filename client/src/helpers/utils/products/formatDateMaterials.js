const formatDateMaterials = (date) => {
  const dateObject = new Date(date);
  const formattedDate = dateObject?.toISOString().split("T")[0];
  return formattedDate;
};
export default formatDateMaterials;
