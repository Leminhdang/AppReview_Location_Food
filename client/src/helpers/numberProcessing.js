const number_processing = number => {
  // đang để max là 99999999
  if (!number) return 0;
  else if (number.toString().length === 8) {
    return number.toString().slice(0, 3) / 10 + ' M';
  } else if (number.toString().length === 7) {
    return number.toString().slice(0, 2) / 10 + ' M';
  } else if (number.toString().length === 6) {
    return number.toString().slice(0, 3) + ' K';
  } else if (number.toString().length === 5) {
    return number.toString().slice(0, 3) / 10 + ' K';
  } else if (number.toString().length === 4) {
    return number.toString().slice(0, 1) + ' K';
  } else {
    return number.toString();
  }
};
export default number_processing;
