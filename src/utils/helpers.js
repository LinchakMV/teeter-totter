export function getRandomNumber(min = 0, max = 1) {
  return min + Math.round(Math.random() * max);
}

export function getRandomColor() {
  const maxValue = 255;

  const r = getRandomNumber(0, maxValue);
  const g = getRandomNumber(0, maxValue);
  const b = getRandomNumber(0, maxValue);

  return `rgb(${r}, ${g}, ${b})`;
}

export function getProportionShapes(shapes = [], leftSide = false) {
  return shapes.reduce((total, current) => {
    const left = leftSide ? 50 - current.left : current.left;

    total += current.weight * left;

    return total;
  }, 0);
}
