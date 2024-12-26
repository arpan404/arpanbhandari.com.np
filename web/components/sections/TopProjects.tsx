import getFeaturedProjects from '@/actions/getFeaturedProjects';
import ProjectCard from '@/components/cards/ProjectCard';
import HorizontalScroll from '@/components/common/HorizontalScroll';
import React from 'react';

export default async function TopProjects() {
  const projects = await getFeaturedProjects();
  console.log(projects);
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">
            What did{' '}
            <span className="dark:text-[#ff7d37] text-[#ff6730] saturate-[110%]">
              I Develop?
            </span>
          </h2>
        </div>
        <div className="flex justify-center mt-4 md:mt-6">
          <p>
            <span className="text-base md:text-lg font-semibold text-primary opacity-80">
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
      </div>
    </section>
  );
}
