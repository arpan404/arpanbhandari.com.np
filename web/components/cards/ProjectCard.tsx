import { Project } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from '@/components/ui/animated-modal';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Modal>
      <Card className="w-[270px] p-0 h-[250px] flex-grow-0 flex-shrink-0">
        <div>
          <ModalTrigger className="p-0 rounded-none">
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${project.thumbnail.url}`}
              alt={project.name}
              width={300}
              height={150}
              draggable={false}
              className="rounded-xl rounded-b-none aspect-video"
            />
          </ModalTrigger>
        </div>
        <CardContent className="p-0">
          <CardTitle className="p-0">
            <ModalTrigger className="p-0 mx-2 opacity-80 hover:opacity-100">
              <h3 className="text-lg font-semibold">
                {project.name}
              </h3>
            </ModalTrigger>
          </CardTitle>
          <CardDescription className="p-0 mx-2">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.shortDescription} {project.shortDescription} {project.shortDescription}{project.shortDescription}{project.shortDescription}{project.shortDescription}{project.shortDescription}{project.shortDescription}{project.shortDescription}{project.shortDescription}{project.shortDescription}{project.shortDescription}{project.shortDescription}{project.shortDescription}{project.shortDescription}{project.shortDescription}{project.shortDescription}{project.shortDescription}{project.shortDescription}{project.shortDescription}{project.shortDescription}{project.shortDescription}{project.shortDescription}{project.shortDescription}
            </p>
          </CardDescription>
        </CardContent>
      </Card>
      <ModalBody>
        <ModalContent>Hello</ModalContent>
      </ModalBody>
    </Modal>
  );
}
