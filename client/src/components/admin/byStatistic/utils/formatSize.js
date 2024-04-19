export const formatSize = (size) => {
  if (size < 1024) {
    return size + " octets";
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + " Ko";
  } else if (size < 1024 * 1024 * 1024) {
    return (size / (1024 * 1024)).toFixed(2) + " Mo";
  } else {
    return (size / (1024 * 1024 * 1024)).toFixed(2) + " Go";
  }
};
