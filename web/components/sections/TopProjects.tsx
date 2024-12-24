import ProjectCard from '@/components/cards/ProjectCard';
import getTopProjects from '@/actions/getTopProjects';
import HorizontalScroll from '../common/HorizontalScroll';

export default async function TopProjects() {
  const projects = await getTopProjects();
  return (
    <section className="p-8 bg-background" id="projects">
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
    </section>
  );
}
