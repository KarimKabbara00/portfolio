import { RefObject } from "react";

// ---------------- Interfaces ---------------- //
interface effectObject {
  fromX: number;
  toX: number;
  fromY: number;
  toY: number;
  color: string;
  size: string;
}
// ---------------- Interfaces ---------------- //

export const getRandomBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const checkInView = (targetRef: RefObject<HTMLDivElement>, name: string, inViewObject: object, setInViewObject: (object: object) => void) => {
  if (targetRef.current) {
    const rect = targetRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    const inView = rect.top <= 75 && rect.left >= 0 && rect.bottom >= windowHeight && rect.right <= windowWidth;
    setInViewObject({ ...inViewObject, [name]: inView });
    console.log({ ...inViewObject, [name]: inView });
  }
};

export const setUpBackgroundEffect = (windowWidth: number, windowHeight: number): effectObject[] => {
  const colors = ["#ef233c", "#C98D00"];
  const sizes = ["0.13rem", "0.14rem", "0.15rem"];

  let particleConfiguration: effectObject[] = [];
  for (let i = 0; i < 50; i++) {
    let fromHorizontal = getRandomBetween(0, windowWidth);
    let toHorizontal = getRandomBetween(0, windowWidth);
    let fromVertical = getRandomBetween(0, windowHeight);
    let toVertical = getRandomBetween(0, windowHeight);
    let colorNum = getRandomBetween(0, 2); // 0-1
    let sizeNum = getRandomBetween(0, 2); // 0-2
    particleConfiguration.push({
      fromX: fromHorizontal,
      toX: toHorizontal,
      fromY: fromVertical,
      toY: toVertical,
      color: colors[colorNum],
      size: sizes[sizeNum],
    });
  }
  console.log(particleConfiguration);
  return particleConfiguration;
};

export const nonLinearNegativeParabolicTrend = (percentage: number): number => {
  return -4 * Math.pow(percentage - 0.5, 2) + 1;
};
