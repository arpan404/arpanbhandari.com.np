import { Project } from '@/lib/types';

export default function ProjectCard({ project }: { project: Project }) {
  return <div>Hello {project.name}</div>;
}
