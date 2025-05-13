"use client";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogOut() {
  return (
    <>
      <button
        onClick={() => signOut()}
        aria-label="Log Out button"
        className="flex items-center gap-2 text-red-700 hover:opacity-75 bg-red-50 w-full md:w-fit justify-between p-3 rounded-lg hover-active-focus font-medium">
        <LogOutIcon size={22} />
        Keluar
      </button>
    </>
  );
}
