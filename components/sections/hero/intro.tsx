import GithubButton from "@/components/buttons/GithubButton";
import LinkedinButton from "@/components/buttons/LinkedinButton";
import React from "react";

export default function Intro() {
  return (
    <div className="flex justify-center w-full sm:w-fit">
      <div>
        <h2 className="sm:text-5xl text-gray-50 font-semibold text-5xl">
          Hey there!
          <br /> I&apos;m{" "}
          <span className="font-bold text-[#ff8e00]">Arpan</span>.
        </h2>
        <span className="relative top-1">
          <h2 className="text-gray-300 lg:text-lg md:text-md text-[1.01rem]">
            Aspiring scholar & seasoned developer.
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
