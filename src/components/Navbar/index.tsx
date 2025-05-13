"use client";
import Image from "next/image";
import Link from "next/link";
import LogOut from "./LogOut";
import useIsMobile from "@/hooks/useIsMobile";
import MobileMenu from "./MobileMenu";
import { useState } from "react";
import { Menu } from "lucide-react";
import { createPortal } from "react-dom";

export default function Navbar() {
  const isMobile = useIsMobile();
  const [showModal, setModal] = useState(false);

  return (
    <header className="w-full sticky top-0 p-4 bg-white shadow-md shadow-black/4">
      <div className="container md:max-w-6xl flex items-center gap-8">
        <Link href="/" className="flex items-center gap-3 hover:opacity-75">
          <Image
            src="/img/smkn3kediri.png"
            alt="SMK Negeri 3 Kediri"
            width={30}
            height={30}
          />
          <span className="text-xl font-semibold">Jurnal PKL</span>
        </Link>
        {isMobile ? (
          <>
            <button
              onClick={() => setModal(true)}
              aria-label="menu"
              className="ml-auto p-2 rounded-lg hover-active-focus">
              <Menu size={18} />
            </button>

            {showModal &&
              createPortal(
                <MobileMenu onClose={() => setModal(false)} />,
                document.body
              )}
          </>
        ) : (
          <>
            <nav className="flex items-center gap-4 mx-auto">
              {navList.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className={
                    "p-2 px-4 rounded-lg hover-active-focus font-medium"
                  }>
                  {item.label}
                </Link>
              ))}
            </nav>
            <LogOut />
          </>
        )}
      </div>
    </header>
  );
}

export const navList = [
  { label: "Beranda", path: "/" },
  { label: "Jurnal", path: "/jurnal" },
] as const;
