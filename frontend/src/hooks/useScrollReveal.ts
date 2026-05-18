import { useRef, useEffect, useState } from "react";
import { useSpring } from "@react-spring/web";

export const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const style = useSpring({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0px)" : "translateY(40px)",
    config: { tension: 200, friction: 30 },
  });

  return { ref, style };
};
