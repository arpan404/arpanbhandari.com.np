import { Project } from '@/lib/types';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { Button } from '../ui/button';

export default function ProjectCategory({
  tags,
}: {
  tags: Project['projectType'];
}) {
  return (
    <div className="">
      {tags.map(tag => (
        <TooltipProvider key={tag.skill.uid}>
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
      ))}
    </div>
  );
}
