import Image from 'next/image';
import Andy from '@/components/common/Andy';
import { LinkPreview } from '@/components/ui/link-preview';

export default function About() {
  return (
    <section className="py-10 sm:py-16 md:py-20 bg-background px-4" id="about">
      <div className="">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">
          Who am{' '}
          <span className="dark:text-[#ff7d37] text-[#ff6730] saturate-[110%]">
            I?
          </span>
        </h2>
      </div>
      <div className="flex justify-center mt-5 md:mt-8">
        <div className="container flex justify-between items-center flex-wrap gap-10">
          <div className="flex items-center justify-center md:flex-1 w-full ">
            <Image
              src={'/images/thinking.png'}
              alt="Thinking"
              width={400}
              height={400}
              className="rounded-full"
              priority={true}
              draggable={false}
            />
          </div>
          <div className="md:flex-1 space-y-2 md:space-y-6">
            <p>
              <span className="text-lg font-semibold text-primary opacity-80">
                In short, a person who loves tech and is intrigued by its
                endless possibilities.
              </span>
            </p>
            <div className="text-base">
              I believe life is a journey of continuous learning, which is why I
              consider myself a learner first and foremost. For me, learning new
              aspects of tech, especially computer science, is what makes me
              enjoy the journey of life. Currently, I am pursuing my
              Bachelor&apos;s in Computer Science at{' '}
              <LinkPreview
                url={'https://usm.edu'}
                height={150}
                width={280}
                className="font-medium underline"
              >
                the University of Southern Mississippi
              </LinkPreview>
              . Along with my studies, I&apos;m working on various open-source
              and personal projects to enhance my skills and knowledge in the
              field of computer science, although I already have solid
              experience in this field.
            </div>
            <div>
              <p className="text-base">
                Want to learn more about me? Just ask my assistant, Andy!
              </p>
              <div className="flex justify-center md:justify-start mt-4">
                <Andy
                  buttonText="Ask Andy"
                  className="py-[10px] px-12 text-base opacity-100 rounded-3xl hover:scale-110 transition-all delay-150 ease-in-out"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
