import { useFormStatus } from "react-dom";
import { twMerge } from "tailwind-merge";

type ButtonSubmitProps = {
  text: string;
  style?: ButtonStyle;
};

type ButtonStyle = "primary" | "black";

const buttonClassName: Record<ButtonStyle, string> = {
  primary: "bg-slate-700 text-white",
  black: "bg-neutral-800 text-white",
};

export function ButtonSubmit({ text, style = "primary" }: ButtonSubmitProps) {
  const { pending } = useFormStatus();
  return (
    <>
      <button
        type="submit"
        disabled={pending}
        className={twMerge(
          "p-3 px-4 rounded-lg font-medium",
          buttonClassName[style]
        )}>
        {text}
      </button>
    </>
  );
}
