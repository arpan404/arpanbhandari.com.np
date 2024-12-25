import ProjectCard from '@/components/cards/ProjectCard';
import getTopProjects from '@/actions/getTopProjects';
import HorizontalScroll from '@/components/common/HorizontalScroll';
import React from 'react';

export default async function TopProjects() {
  const projects = await getTopProjects();
  if (!projects) return <></>;

  return (
    <section
      className="flex justify-center bg-background py-10 sm:py-16 md:py-20"
      id="projects"
    >
      <div className="container px-2 md:px-8">
        <HorizontalScroll>
          <>
            {projects.data && projects.data.topProject.project && (
              <>
                {projects.data.topProject.project.map((project, index) => (
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
