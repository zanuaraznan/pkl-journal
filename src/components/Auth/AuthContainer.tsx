import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

type AuthContainerProps = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  link?: {
    text: string;
    path: string;
  };
};

export default function AuthContainer({
  children,
  title,
  subtitle,
  link,
}: AuthContainerProps) {
  return (
    <section className="relative flex flex-col items-center gap-2 p-8 pt-16 bg-white rounded-2xl w-full md:max-w-md">
      <div className="p-2 w-fit bg-white -top-[50px] aspect-square rounded-full absolute">
        <Image
          src="/img/smkn3kediri.png"
          width={72}
          height={72}
          alt="SMK Negeri 3 Kediri"
        />
      </div>
      {title && (
        <h1 className="text-xl font-semibold tracking-wide">{title}</h1>
      )}
      {subtitle && <p className="text-center mb-4">{subtitle}</p>}
      {children}
      {link && (
        <Link
          href={link.path}
          className="mt-2 text-sm text-slate-600 hover:underline hover:opacity-75 active:underline active:opacity-75">
          {link.text}
        </Link>
      )}
    </section>
  );
}
