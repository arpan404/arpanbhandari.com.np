import Link from "next/link";
import React from "react";
import { AiFillLinkedin } from "react-icons/ai";

export default function LinkedinButton() {
  return (
    <Link href="https://www.linkedin.com/in/arpan404/" target="_blank">
      <button className="group hover:bg-sky-600 relative bg-sky-700 rounded-lg text-neutral-50 duration-500 font-bold flex justify-start gap-2 items-center p-2 pr-6">
        <AiFillLinkedin className="text-3xl" />
        <span className="border-l-2 px-1">arpan404</span>
        <div className="group-hover:opacity-100 opacity-0 top-16 absolute z-10 inline-block px-3 py-2 text-xs font-medium text-white transition-opacity duration-500 bg-sky-600 rounded-lg shadow-sm before:w-3 before:h-3 before:rotate-45 before:-top-1 before:left-20 before:bg-sky-600 before:absolute">
          See my profile!
        </div>
      </button>
    </Link>
  );
}
