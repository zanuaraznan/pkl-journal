"use client";

import { useEffect } from "react";

type modalConfirmProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmLogout({
  message,
  onConfirm,
  onCancel,
}: modalConfirmProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onCancel]);
}
