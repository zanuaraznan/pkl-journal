import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ButtonRipple from "@/components/ButtonRipple";
import Providers from "./providers";
export const googleSans = localFont({
  src: "./fonts/googleSans.woff2",
});

export const metadata: Metadata = {
  title: "Beranda | PKL SMKN 3 KEDIRI",
  description:
    "Website pengumpulan jurnal selama PKL bagi siswa SMK Negeri 3 Kediri",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${googleSans.className} antialiased text-neutral-900`}>
        <ButtonRipple />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
