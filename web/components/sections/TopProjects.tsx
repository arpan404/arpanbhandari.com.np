import ProjectCard from '@/components/cards/ProjectCard';
import getTopProjects from '@/actions/getTopProjects';

export default async function TopProjects() {
  const projects = await getTopProjects();
  return (
    <section className="p-8">
      {projects.data && (
        <ProjectCard project={projects.data.topProject.project[0].project} />
      )}
    </section>
  );
}
