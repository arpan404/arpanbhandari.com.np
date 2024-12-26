import getFeaturedProjects from '@/actions/getFeaturedProjects';
import ProjectCard from '@/components/cards/ProjectCard';
import HorizontalScroll from '@/components/common/HorizontalScroll';
import React from 'react';

export default async function TopProjects() {
  const projects = await getFeaturedProjects();

  return (
    <section
      className="flex justify-center bg-background py-10 sm:py-16 md:py-20"
      id="projects"
    >
      <div className="container px-2 md:px-8">
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
    </section>
  );
}
