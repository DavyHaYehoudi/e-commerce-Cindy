export const filterByYear = (year) => {
  let filter = {};

  if (year !== "-1") {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(parseInt(year, 10) + 1, 0, 1);
    filter.createdAt = { $gte: startDate, $lt: endDate };
  }

  return filter;
};
