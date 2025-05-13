"use client";
import Backdrop from "@/components/Navbar/Backdrop";
import { useCallback, useEffect, useRef, useState } from "react";

export default function SuccessModal({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  const [isClosing, setClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setClosing(true);
  }, [message]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => onClose(), 300);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isClosing, onClose]);

  return (
    <>
      <Backdrop isClosing={isClosing} />
      <div
        ref={modalRef}
        className={`
          absolute p-6 rounded-bl-2xl bg-white min-w-[200px] top-0 right-0 flex flex-col gap-4 items-center justify-center ${
            isClosing ? "animate-menuOut" : "animate-menuIn"
          }
        `}></div>
    </>
  );
}
