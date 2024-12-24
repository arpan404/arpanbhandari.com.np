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
} from '@/components/common/ProjectModal';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Code, View } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import ViewProject from '../buttons/ViewProject';
import ViewCode from '../buttons/ViewCode';
import ReadBlueprints from '../buttons/ReadBlueprints';

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
      <ModalBody className="md:max-w-[750px] p-0 md:p-0">
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
                  <h3 className="text-base text-center text-muted-foreground">
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
                    <ReadBlueprints
                      url={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/writings/${project.article.uid}`}
                    />
                  )}
                </div>
              </div>
              <div
                className="bg-secondary h-[2px] rounded-full"
                role="separator"
              />
              <div>
                Lorem ipsum odor amet, consectetuer adipiscing elit. Erat magnis
                consequat himenaeos ipsum velit porta eu orci. Suspendisse
                mollis mollis congue taciti lacus conubia? Metus odio diam
                platea quis bibendum maximus donec mus. Sapien nisl tincidunt
                sagittis erat vehicula. Risus auctor netus pharetra porttitor
                neque consectetur mattis. Condimentum taciti conubia ridiculus
                magna conubia ultricies, dolor etiam. Habitant sociosqu
                adipiscing tellus duis sagittis curabitur morbi. Facilisis
                laoreet amet ultrices est parturient nullam torquent. Viverra mi
                imperdiet habitant habitant vestibulum euismod. Rhoncus ac
                rutrum arcu pulvinar proin quam platea. Laoreet orci cursus
                sollicitudin rutrum suscipit duis volutpat. Commodo est neque
                efficitur varius facilisis dapibus vulputate? Lobortis pharetra
                ultrices tortor sem facilisi elit conubia luctus. Vestibulum
                augue nisi consectetur molestie pretium quam per. Dolor euismod
                vivamus gravida massa faucibus facilisis urna nec dui. Ultricies
                dolor ligula interdum euismod non fusce. Asapien accumsan per
                varius curae faucibus vehicula fringilla. Quis venenatis dictum
                nulla felis leo efficitur. Mollis integer ex praesent auctor
                habitant tempor. Lacus nunc morbi ipsum curae ligula lacinia
                hendrerit. Ridiculus neque platea iaculis metus consequat
                fermentum volutpat. Non odio commodo velit senectus in ipsum.
                Sem accumsan pellentesque pulvinar maximus nam nullam. Hac nisi
                consectetur porttitor vulputate vulputate. Commodo egestas et at
                nibh suscipit. Varius cursus blandit feugiat; cras maximus massa
                volutpat. Placerat eleifend ultrices magnis class, duis sapien.
                Duis ac ultrices id morbi mus finibus. Est maximus auctor vitae
                sodales nisi sem. Interdum id morbi nascetur conubia augue
                fringilla. Felis sociosqu nisi mauris nam; fringilla suscipit.
                Turpis urna aliquam donec inceptos elementum. Sodales conubia
                est class mollis consectetur ante fringilla euismod. Accumsan
                fringilla proin; aliquam etiam dictumst mattis libero mi.
                Placerat nec neque luctus interdum fringilla egestas. Vitae
                lacinia vivamus pharetra aliquam hac nisl vestibulum metus.
                Vestibulum malesuada integer iaculis praesent hendrerit molestie
                posuere sit.
              </div>
            </div>
            {/* </div> */}
            {/* <div className=''>
              <div>
                <h3 className="text-xl font-semibold">{project.name}</h3>
              </div>
              <TechnologiesTooltip data={project.technologiesUsed} />
            </div> */}
          </div>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
}
