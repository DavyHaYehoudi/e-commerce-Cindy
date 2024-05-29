export const calculatePercentage = (sizeInBytes) => {
  const totalSizeInBytes = 5 * 1024 * 1024 * 1024; // 5 Go en octets

  const percentage = (sizeInBytes / totalSizeInBytes) * 100;

  return percentage.toFixed(2);
};

export default calculatePercentage;
