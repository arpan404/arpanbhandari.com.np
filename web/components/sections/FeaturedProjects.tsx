import React from 'react';
import Link from 'next/link';

import ProjectCard from '@/components/cards/ProjectCard';
import getFeaturedProjects from '@/actions/getFeaturedProjects';
import HorizontalScroll from '@/components/common/HorizontalScroll';

export default async function FeaturedProjects() {
  const projects = await getFeaturedProjects();
  if (
    !projects ||
    !projects.featuredProjects ||
    !projects.featuredProjects.projects ||
    projects.featuredProjects.projects.length === 0 ||
    projects.featuredProjects.projects[0].project === null
  )
    return <></>;

  return (
    <section
      className="flex justify-center bg-background py-10 sm:py-16 md:py-20"
      id="projects"
    >
      <div className="container px-2 md:px-8">
        <div className="">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center select-none">
            What did{' '}
            <span className="dark:text-[#ff7d37] text-[#ff6730] saturate-[110%]">
              I Develop?
            </span>
          </h2>
        </div>
        <div className="flex justify-center mt-4 md:mt-6">
          <p>
            <span className="text-base md:text-lg font-semibold text-primary/80">
              Engaged in diverse projects—here&apos;s a glimpse of some of my
              latest work:
            </span>
          </p>
        </div>

        <div className="mt-6 md:mt-8">
          <HorizontalScroll>
            <>
              {projects && projects.featuredProjects && (
                <>
                  {projects.featuredProjects.projects.map((project, index) => (
                    <React.Fragment key={index}>
                      {project.project && (
                        <ProjectCard project={project.project} key={index} />
                      )}
                    </React.Fragment>
                  ))}
                </>
              )}
            </>
          </HorizontalScroll>
        </div>
        <div className="mt-4 md:mt-6 flex justify-center select-none">
          <h3>
            Want to see more?{' '}
            <Link
              href={'/projects'}
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
