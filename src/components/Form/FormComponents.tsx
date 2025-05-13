import { twMerge } from "tailwind-merge";

type FormInputProps = {
  type: string;
  name: string;
  placeholder: string;
  onLabel?: boolean;
};

export function FormInput({
  type,
  name,
  placeholder,
  onLabel = false,
}: FormInputProps) {
  return (
    <>
      {onLabel ? (
        <div id={`${name}Container`}>
          <label htmlFor={name} className="block mb-2">
            {name}
          </label>
          <input
            id={name}
            type={type}
            name={name}
            placeholder={placeholder}
            className="p-4 rounded-xl bg-white w-full focus:outline-none focus:ring-2 focus:ring-slate-300 transition-all"
          />
        </div>
      ) : (
        <div
          id={`${name}Container`}
          className="flex relative justify-center flex-col">
          <input
            id={name}
            type={type}
            name={name}
            placeholder={placeholder}
            className="p-4 rounded-xl bg-white w-full focus:outline-none focus:ring-2 focus:ring-slate-300 transition-all"
          />
        </div>
      )}
    </>
  );
}

export function ErrorMessage({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) {
  if (!text) return null;
  return (
    <p className={twMerge("text-sm text-red-700 mt-2", className)}>{text}</p>
  );
}
