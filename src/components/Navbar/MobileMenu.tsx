"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { navList } from ".";
import Link from "next/link";
import { X } from "lucide-react";
import LogOut from "./LogOut";
import Backdrop from "./Backdrop";

export default function MobileMenu({ onClose }: { onClose: () => void }) {
  const [isClosing, setClosing] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setClosing(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
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
        ref={menuRef}
        className={`
          absolute p-6 rounded-bl-2xl bg-white min-w-[200px] top-0 right-0 flex flex-col gap-4 items-center justify-center ${
            isClosing ? "animate-menuOut" : "animate-menuIn"
          }
        `}>
        <nav className="flex flex-col items-end w-full gap-4">
          <button
            onClick={handleClose}
            aria-label="Close button"
            className=" p-3 rounded-lg hover-active-focus">
            <X size={18} />
          </button>
          {navList.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              aria-label={`Menu ${item.label}`}
              onClick={() => {
                const timer = setTimeout(() => handleClose(), 200);
                return () => clearTimeout(timer);
              }}
              className="w-full text-right p-3 rounded-lg hover-active-focus font-medium">
              {item.label}
            </Link>
          ))}
          <LogOut />
        </nav>
      </div>
    </>
  );
}
