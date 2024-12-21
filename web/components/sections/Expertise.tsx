import getSpecializations from '@/actions/getSpecializations';
import Skill from '../buttons/Skill';

export default async function Expertise() {
  const specializations = await getSpecializations();
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
      </div>
    </section>
  );
}
