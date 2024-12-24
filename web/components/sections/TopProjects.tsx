import ProjectCard from '@/components/cards/ProjectCard';
import getTopProjects from '@/actions/getTopProjects';

export default async function TopProjects() {
  const projects = await getTopProjects();
  return (
    <section className="p-8 bg-background" id="projects">
      <div className="flex flex-initial gap-4 overflow-x-scroll scrollbar-hide">
        {projects.data && projects.data.topProject.project && (
          <>
            {projects.data.topProject.project.map((project, index) => (
              <ProjectCard project={project.project} key={index} />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
