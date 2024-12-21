import getSpecializations from '@/actions/getSpecializations';

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {specializations.data &&
          specializations.data.specializations.map(specialization => (
            <div>{specialization.skill.name}</div>
          ))}
      </div>
    </section>
  );
}
