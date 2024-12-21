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
          <div className="container flex justify-between">
            <div className="flex items-center justify-center w-full md:w-1/2">
              <div className="text-base space-y-4">
                <p>
                  In addition to my expertise in these technologies, I bring a
                  strong and diverse foundation in computer science and
                  programming. This knowledge has enabled me to design, develop,
                  and deploy solutions ranging from small-scale applications to
                  highly sophisticated, large-scale systems tailored to meet
                  specific requirements. My ability to adapt to various
                  challenges and deliver impactful results reflects my
                  commitment to excellence and problem-solving.
                </p>
                <p>
                  I have extensive experience in full-stack web and mobile app
                  development, where I&apos;ve successfully built user-friendly,
                  feature-rich applications. Over the years, I&apos;ve also
                  contributed actively to open-source projects, collaborating
                  with global developer communities. These experiences have
                  sharpened my technical skills and fostered a culture of
                  innovation, teamwork, and continuous learning.
                </p>

                <p>
                  Recently, my interests have evolved toward Artificial
                  Intelligence (AI) and Machine Learning (ML). I&apos;ve been
                  deeply engaged in exploring innovative solutions and working
                  on cutting-edge projects, broadening my expertise to remain at
                  the forefront of advancements in these dynamic fields.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center w-full md:w-1/2">
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
