import { RefObject } from "react";

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