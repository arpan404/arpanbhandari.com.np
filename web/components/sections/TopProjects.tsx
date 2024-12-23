import ProjectCard from "@/components/cards/ProjectCard";

export default function TopProjects() {
  return <section className="p-8">
    <ProjectCard project={{
        name: "Project 1",
        description: "This is a project.",
        image: "https://via.placeholder.com/150",
        link: "https://example.com"

    }}/>
  </section>;
}
