import { Project } from '@/lib/types';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
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
      <Card className="w-[300px] p-0 h-[280px] flex-grow-0 flex-shrink-0">
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
            <ModalTrigger className="p-0">
              <h3 className="text-xl font-bold text-muted-foreground">
                {project.name}
              </h3>
            </ModalTrigger>
          </CardTitle>
        </CardContent>
      </Card>
      <ModalBody>
        <ModalContent>Hello</ModalContent>
      </ModalBody>
    </Modal>
  );
}
