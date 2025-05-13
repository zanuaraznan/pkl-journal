import { twMerge } from "tailwind-merge";

export default function Backdrop({ isClosing }: { isClosing: boolean }) {
  return (
    <div
      className={twMerge(
        "fixed inset-0 backdrop-blur-md backdrop-brightness-65",
        isClosing ? "animate-fadeOut" : "animate-fadeIn"
      )}></div>
  );
}
