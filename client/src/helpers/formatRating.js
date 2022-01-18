export default rate => {
  if (!rate) return 0;
  if (rate.toString().length === 1) return `${rate}.0`;
  return rate.toString().substr(0, 3);
};
