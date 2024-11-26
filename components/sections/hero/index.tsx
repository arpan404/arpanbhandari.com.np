import React from "react";
import Intro from "./intro";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="w-full flex justify-center h-[100dvh]">
      <main className="container flex justify-between items-center flex-wrap">
        <Intro />
        <div>
          <div className="flex items-center">
            <Image
              src={"/images/hero.png"}
              height={500}
              width={500}
              alt="Arpan Bhandari"
              className="z-0 rounded-full"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
