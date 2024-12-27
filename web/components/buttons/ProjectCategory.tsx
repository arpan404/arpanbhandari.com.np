import Project from '@/types/project';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Fragment } from 'react';

export default function ProjectCategory({
  tags,
}: {
  tags: Project['projectType'];
}) {
  if (!tags) return <></>;
  return (
    <div className="">
      {tags.map((tag, index: number) => (
        <Fragment key={index}>
          {tag.skill && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/projects?tag=${tag.skill.uid}`}>
                    <Button
                      variant={'outline'}
                      size={'icon'}
                      className="rounded-full text-[0.65rem] w-fit font-medium px-4 py-1 h-fit mx-1 my-[2px]"
                    >
                      {tag.skill.name}
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="p-0 px-3 py-1 rounded-full z-[202] text-[0.6rem]">
                  View Similar Projects
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </Fragment>
      ))}
    </div>
  );
}
