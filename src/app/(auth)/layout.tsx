import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="container flex items-center justify-center min-h-screen w-full py-12">
      <div
        style={{
          backgroundImage: 'url("/img/noise.png")',
          backgroundRepeat: "repeat",
          backgroundSize: "48px 48px",
          backgroundPosition: "top left",
        }}
        className="fixed inset-0 -z-10 bg-neutral-100"></div>
      {children}
    </main>
  );
}
