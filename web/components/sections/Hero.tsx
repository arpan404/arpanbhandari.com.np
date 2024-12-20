import Github from '@/components/buttons/Github';
import Linkedin from '@/components/buttons/Linkedin';
import AnimatedBackground from '@/components/common/AnimatedBackground';
import AnimatedChevron from '../common/ScrollHint';

export default function Hero() {
  return (
    <div className="flex items-center justify-center h-[calc(100dvh-0px)] pt-[52px]">
      <div>
        <AnimatedBackground />
        <div>
          <div className="text-center select-none px-2">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <h2>
                Hey there! <br />
              </h2>

              <h1 className="pt-1 pb-2">
                I&apos;m{' '}
                <span className="dark:text-[#ff7d37] text-[#ff6730] hover:cursor-pointer saturate-[110%] hover:saturate-[130%] select-none transition-all delay-75 ease-linear">
                  Arpan Bhandari.
                </span>
              </h1>
            </span>
            <p className="text-sm sm:text-base lg:text-lg font-medium text-muted-foreground py-1">
              An aspiring scholar, experienced developer, and sometimes a
              writer.
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          <Linkedin url="https://www.linkedin.com/in/arpan404/" />
          <Github url="https://github.com/arpan404/" />
        </div>
        <div className="relative top-10">
          <AnimatedChevron />
        </div>
      </div>
    </div>
  );
}
