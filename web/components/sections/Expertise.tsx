import getSpecializations from '@/actions/getSpecializations';
import Skill from '@/components/buttons/Skill';
import getResume from '@/actions/getResume';
import ViewResume from '../buttons/ViewResume';

export default async function Expertise() {
  const specializations = await getSpecializations();
  const resume = await getResume();
  console.log(resume);
  return (
    <section
      className="py-10 sm:py-16 md:py-20 bg-background"
      id="technologies"
    >
      <div className="">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">
          What do{' '}
          <span className="dark:text-[#ff7d37] text-[#ff6730] saturate-[110%]">
            I Know?
          </span>
        </h2>
      </div>
      <div className="mt-5 md:mt-8 px-4 md:flex-1 space-y-4 md:space-y-6">
        <div className="flex justify-center">
          <p>
            <span className="text-lg font-semibold text-primary opacity-80">
              Worked on a variety of technologies and tools, but right now,
              I&apos;m actively working with:
            </span>
          </p>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 container gap-2 md:gap-4">
            {specializations.data &&
              specializations.data.specializations.map(specialization => (
                <Skill
                  key={specialization.skill.uid}
                  name={specialization.skill.name}
                  uid={specialization.skill.uid}
                />
              ))}
          </div>
        </div>
        <div className="flex justify-center py-2 md:py-4">
          <div className="container flex justify-between flex-wrap gap-8 md:gap-0 w-full">
            <div className="flex justify-center w-full md:w-1/2 px-2 md:px-4">
              <div className="text-base space-y-4">
                <p>
                  I&apos;ve built a strong foundation in computer science and
                  programming, which has enabled me to design, develop, and
                  deploy solutions ranging from small applications to large,
                  complex systems tailored to specific needs. My experience
                  spans full-stack web and mobile app development, where
                  I&apos;ve created user-friendly, feature-rich applications.
                  I&apos;ve also worked extensively on scripting and automation,
                  streamlining workflows and improving efficiency in various
                  projects.{' '}
                </p>
                <p>
                  In addition, I&apos;ve actively contributed to open-source
                  projects, collaborating with global developer communities,
                  which has sharpened my technical skills and fostered a culture
                  of teamwork and continuous learning. Recently, I&apos;ve been
                  focusing on Artificial Intelligence (AI) and Machine Learning
                  (ML), working on innovative and exciting projects to stay at
                  the forefront of these rapidly evolving fields.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center w-full md:w-1/2 px-2 md:px-4">
              aa
            </div>
          </div>
        </div>
        <div>
          {resume.data?.resume.resume.url && (
            <ViewResume
              url={`${process.env.NEXT_PUBLIC_STRAPI_URL}${resume.data?.resume.resume.url}`}
            />
          )}
        </div>
      </div>
    </section>
  );
}
