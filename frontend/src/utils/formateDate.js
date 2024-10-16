export const formetDate = (isDate) => {
  const date = new Date(isDate);
  return date.toLocaleString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
