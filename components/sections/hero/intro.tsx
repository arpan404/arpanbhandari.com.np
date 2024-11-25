import GithubButton from "@/components/buttons/GithubButton";
import LinkedinButton from "@/components/buttons/LinkedinButton";
import React from "react";

export default function Intro() {
  return (
    <div className="flex justify-center w-full sm:w-fit">
      <div>
        <h2 className="sm:text-6xl text-gray-50 font-bold text-5xl">
          Hey there!
          <br /> I&apos;m{" "}
          <span className="font-black text-[#ff8e00]">Arpan</span>.
        </h2>
        <span className="mt-2">
          <h2 className="text-gray-300 lg:text-xl md:text-lg text-[1.01rem] ">
            Aspiring scholar & seasoned software engineer.
          </h2>
        </span>
        <div className="flex gap-4 mt-6 flex-wrap">
          <LinkedinButton />
          <GithubButton />
        </div>
      </div>
    </div>
  );
}
