import Github from "../buttons/Github";
import ViewResume from "../buttons/ViewResume";
import Linkedin from "../buttons/Linkedin";

export default function Hero() {
  return (
    <div className="flex items-center justify-center h-[calc(100dvh-60px)]">
      <div>
        {/* <div className="mb-8 flex justify-center">
          <ViewResume />
        </div> */}
        <div>
          <div className="text-center">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <h2>
                Hey There! <br />
              </h2>

              <h1 className="pt-1 pb-2">
                I'm{" "}
                <span className="dark:text-[#ff7d37] text-[#ff6730]">
                  Arpan Bhandari.
                </span>
              </h1>
            </span>
            <p className="text-sm sm:text-base lg:text-lg font-medium text-muted-foreground py-1">
              An aspiring scholar, experienced developer, and sometimes a
              writer.
            </p>
            <p></p>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          <Linkedin url="https://www.linkedin.com/in/arpan404/" />
          <Github url="https://github.com/arpan404/" />
        </div>
      </div>
    </div>
  );
}
