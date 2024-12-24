import ProjectCard from '@/components/cards/ProjectCard';
import getTopProjects from '@/actions/getTopProjects';
import HorizontalScroll from '../common/HorizontalScroll';

export default async function TopProjects() {
  const projects = await getTopProjects();
  return (
    <section
      className="flex justify-center bg-background py-10 sm:py-16 md:py-20"
      id="projects"
    >
      <div className="container">
        <HorizontalScroll>
          <>
            {projects.data && projects.data.topProject.project && (
              <>
                {projects.data.topProject.project.map((project, index) => (
                  <ProjectCard project={project.project} key={index} />
                ))}
              </>
            )}
          </>
        </HorizontalScroll>
      </div>
    </section>
  );
}
