const ENTER_KEY_CODE = 13;

const getCenterXElemPos = (elem) => {
  if(!elem) return 0;
  const cords = elem.getBoundingClientRect();
  return (cords.left + cords.right) / 2;
};

const getCenterYElemPos = (elem) => {
  if(!elem) return 0;
  const cords = elem.getBoundingClientRect();
  return (cords.top + cords.bottom) / 2;
};

const anglePoint = (a, b, c) => {
  const x1 = a.x - b.x;
  const x2 = c.x - b.x;
  const y1 = a.y - b.y;
  const y2 = c.y - b.y;
  const d1 = Math.sqrt(x1 * x1 + y1 * y1);
  const d2 = Math.sqrt(x2 * x2 + y2 * y2);

  const angle = Math.acos((x1 * x2 + y1 * y2) / (d1 * d2)) * 180 / Math.PI;
  if(x2 > 0) {
    return 360 - angle;
  }
  return angle;
};

const animate = (options) => {
  const start = performance.now();
  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / options.duration;
    if(timeFraction > 1) timeFraction = 1;

    const progress = options.timing(timeFraction);
    options.draw(progress);

    if(timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
};

export default {
  ENTER_KEY_CODE,
  getCenterXElemPos,
  getCenterYElemPos,
  anglePoint,
  animate
};

