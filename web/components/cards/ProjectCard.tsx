'use client';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

import ReadBlueprints from '@/components/buttons/ReadBlueprints';
import ViewCode from '@/components/buttons/ViewCode';
import ViewProject from '@/components/buttons/ViewProject';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from '@/components/modals/ProjectModal';
import TechnologiesTooltip from '@/components/common/Technologies';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import ProjectCategory from '@/components/buttons/ProjectCategory';
import Project from '@/types/project';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Modal>
      <Card className="w-[270px] p-0 h-[240px] flex-grow-0 flex-shrink-0 overflow-hidden">
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
      <ModalBody className="md:max-w-[750px] p-0 md:p-0 scrollbar-hide">
        <ModalContent className="p-0 md:p-0">
          <div>
            <div className="w-full aspect-video overflow-hidden p-0 md:p-0">
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${project.thumbnail.url}`}
                alt={project.name}
                width={1000}
                height={700}
                draggable={false}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative bg-background rounded-t-lg -top-10 px-4 pt-6">
              <div>
                <div className="flex justify-center items-center">
                  <h2 className="text-center text-2xl sm:text-3xl font-bold text-primary/80">
                    {project.name}
                  </h2>
                </div>
                <div className="flex justify-center items-center pt-1">
                  <h3 className="text-sm text-center text-muted-foreground">
                    {project.shortDescription}
                  </h3>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2 mb-4">
                <div className="flex gap-2 md:gap-3">
                  {project.liveURL && <ViewProject url={project.liveURL} />}
                  {project.codeURL && <ViewCode url={project.codeURL} />}
                </div>
                <div className="flex">
                  {project.article && project.article.uid && (
                    <ReadBlueprints url={`/writings/${project.article.uid}`} />
                  )}
                </div>
              </div>
              <div
                className="bg-secondary h-[2px] rounded-full"
                role="separator"
              />
              <div className="mt-4">
                <ReactMarkdown
                  className={
                    'w-full overflow-x-hidden break-words whitespace-normal space-y-2 text-sm'
                  }
                >
                  {project.longDescription}
                </ReactMarkdown>
              </div>
              {project.technologiesUsed &&
                project.technologiesUsed.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-primary/85">
                      Tech Stack
                    </h3>
                    <div className="mt-2">
                      <TechnologiesTooltip data={project.technologiesUsed} />
                    </div>
                  </div>
                )}

              {project.projectType && project.projectType.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-primary/85">
                    Category
                  </h3>
                  <div className="mt-2">
                    <ProjectCategory tags={project.projectType} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
}
