import Link from 'next/link';

import WritingCard from '@/components/cards/WritingCard';
import getFeaturedWritings from '@/actions/getFeaturedWritings';
import HorizontalScroll from '@/components/common/HorizontalScroll';

export default async function FeaturedWritings() {
  const writings = await getFeaturedWritings();
  if (!writings || writings.articles.length === 0) return <></>;

  return (
    <section
      className="flex justify-center bg-background py-10 sm:py-16 md:py-20"
      id="writings"
    >
      <div className="container px-2 md:px-8">
        <div className="">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center select-none">
            What did{' '}
            <span className="dark:text-[#ff7d37] text-[#ff6730] saturate-[110%]">
              I Write?
            </span>
          </h2>
        </div>
        <div className="flex justify-center mt-4 md:mt-6">
          <p>
            <span className="text-base md:text-lg font-semibold text-primary/80">
              I try my hand at writing sometimes—here are a few of my latest
              pieces!
            </span>
          </p>
        </div>

        <div className="mt-6 md:mt-8 flex justify-center">
          <HorizontalScroll width={300}>
            {writings.articles.map(article => (
              <WritingCard {...article} key={article.uid} />
            ))}
          </HorizontalScroll>
        </div>
        <div className="mt-4 md:mt-6 flex justify-center select-none">
          <h3>
            Want to see more?{' '}
            <Link
              href={'/writings'}
              className="dark:text-[#ff7d37] text-[#ff6730] saturate-[110%] hover:saturate-[130%] font-semibold hover:underline cursor-pointer hover:underline-offset-2"
            >
              Click Here.
            </Link>
          </h3>
        </div>
      </div>
    </section>
  );
}
