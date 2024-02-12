export const formatDate = (dateString, includeTime = true) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: includeTime ? "2-digit" : undefined,
    minute: includeTime ? "2-digit" : undefined,
  };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "fr-FR",
    options
  );
  return formattedDate;
};
