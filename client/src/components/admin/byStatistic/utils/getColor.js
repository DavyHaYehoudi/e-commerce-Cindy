export const getColor = (percentage) => {
  let color;
  if (percentage <= 94) {
    color = "var(--success)";
  } else {
    color = "var(--danger)";
  }
  return color;
};
