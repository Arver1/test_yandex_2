const ENTER_KEY_CODE = 13;

const getCenterXElemPos = (elem) => {
  if(!elem) return 0;
  const coords = elem.getBoundingClientRect();
  return (coords.left + coords.right) / 2;
};

const getCenterYElemPos = (elem) => {
  if(!elem) return 0;
  const coords = elem.getBoundingClientRect();
  return (coords.top + coords.bottom) / 2;
};

export default {
  ENTER_KEY_CODE,
  getCenterXElemPos,
  getCenterYElemPos
};

