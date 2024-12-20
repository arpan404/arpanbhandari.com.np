import Image from 'next/image';
import Andy from '../common/Andy';

export default function About() {
  return (
    <section className="py-10 bg-background px-4">
      <div className="">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">
          Who am{' '}
          <span className="dark:text-[#ff7d37] text-[#ff6730] saturate-[110%]">
            I?
          </span>
        </h2>
      </div>
      <div className="flex justify-center mt-5">
        <div className="container flex justify-between items-center flex-wrap gap-10">
          <div className="flex items-center justify-center md:flex-1 w-full ">
            <Image
              src={'/images/thinking.png'}
              alt="Thinking"
              width={400}
              height={400}
              className="rounded-full"
            />
          </div>
          <div className="md:flex-1 space-y-2 md:space-y-8">
            <p className="text-base">
              I am a dedicated scholar, a fervent tech enthusiast, and an adept
              software developer with a passion for unraveling complex problems
              using an array of programming tools and languages. My affinity for
              technology propels me into the realm of new innovations, while my
              unwavering commitment to the craft fuels my continuous journey as
              a developer. Fueled by a perpetual eagerness to learn and adapt to
              the dynamic tech landscape, I thrive on the challenges that
              accompany staying at the forefront of the ever-evolving digital
              realm.
            </p>
            <div>
              <p className="text-base">
                Wanna learn more about me? Why not ask my assistant, Andy?
              </p>
              <div>
                <Andy buttonText="Chat with Andy" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
