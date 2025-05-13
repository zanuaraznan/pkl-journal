"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type TargetInfo = {
  x: number;
  y: number;
  target: HTMLElement;
  container: HTMLElement;
};

export default function ButtonRipple() {
  const [info, setInfo] = useState<TargetInfo | null>(null);
  const [children, setChildren] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    const handleButtonClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        target.tagName !== "BUTTON" &&
        target.getAttribute("role") !== "button"
      ) {
        return;
      }

      const rect = target.getBoundingClientRect();

      const rippleContainer = document.createElement("div");
      rippleContainer.className = "ripple-container";
      target.appendChild(rippleContainer);

      setChildren(true);

      setInfo({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        target,
        container: rippleContainer,
      });

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setChildren(false);
        target.removeChild(rippleContainer);
      }, 1400);
    };
    document.addEventListener("click", handleButtonClick);
    return () => {
      document.removeEventListener("click", handleButtonClick);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      {info &&
        info?.container &&
        children &&
        createPortal(
          <div
            style={{
              left: `${info.x - 135}px`,
              top: `${info.y - 135}px`,
            }}></div>,
          info.container
        )}
    </>
  );
}
