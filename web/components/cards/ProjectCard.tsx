'use client';
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
import TechnologiesTooltip from '../common/Technologies';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Modal>
      <Card className="w-[270px] p-0 h-[250px] flex-grow-0 flex-shrink-0 overflow-hidden">
        <div>
          <ModalTrigger className="p-0 rounded-none w-full aspect-video overflow-hidden flex justify-center items-center rounded-b-none">
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${project.thumbnail.url}`}
              alt={project.name}
              width={300}
              height={200}
              draggable={false}
              className="w-full h-full object-cover"
            />
          </ModalTrigger>
        </div>
        <CardContent className="p-0">
          <CardTitle className="p-0">
            <ModalTrigger className="p-0 mx-2 opacity-90 hover:opacity-100 hover:underline underline-offset-2 mt-2">
              <h3 className="text-base font-semibold">{project.name}</h3>
            </ModalTrigger>
          </CardTitle>
          <CardDescription className="p-0 mx-2">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.shortDescription}
            </p>
          </CardDescription>
        </CardContent>
      </Card>
      <ModalBody className="md:max-w-[750px] max-h-fit md:max-h-fit min-h-[100px] md:min-h-52 p-0">
        <ModalContent className="px-2 md:px-4">
          <div>
            <div className="flex gap-4">
              <div className="w-full max-w-[250px] aspect-video overflow-hidden rounded-lg border-muted border-[0.5px]">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${project.thumbnail.url}`}
                  alt={project.name}
                  width={300}
                  height={200}
                  draggable={false}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div>
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                </div>
                <TechnologiesTooltip data={project.technologiesUsed} />
              </div>
            </div>
          </div>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
}
