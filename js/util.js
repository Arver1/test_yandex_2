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

const anglePoint = (a, b, c) => {
  const x1 = a.x - b.x;
  const x2 = c.x - b.x;
  const y1 = a.y - b.y;
  const y2 = c.y - b.y;
  const d1 = Math.sqrt(x1 * x1 + y1 * y1);
  const d2 = Math.sqrt(x2 * x2 + y2 * y2);
  return Math.acos((x1 * x2 + y1 * y2) / (d1 * d2));
};

export default {
  ENTER_KEY_CODE,
  getCenterXElemPos,
  getCenterYElemPos,
  anglePoint,
};

