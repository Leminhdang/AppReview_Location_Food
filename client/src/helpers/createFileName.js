export default () => {
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  const seconds = new Date().getSeconds();
  const miliseconds = new Date().getMilliseconds();
  return `${hours}_${minutes}_${seconds}_${miliseconds}`;
};
