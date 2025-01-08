import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import OrangeButton from '@/components/buttons/OrangeButton';
import { Eye } from 'lucide-react';

export default function ViewProject({ url }: { url: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={url} target="_blank" className='select-none'>
            <OrangeButton className="rounded-full h-10 w-10 sm:w-fit px-0 sm:px-6 md:px-8 text-sm">
              <span className="hidden sm:block">View Project</span>
              <Eye size={20} className="sm:hidden" />
            </OrangeButton>
          </Link>
        </TooltipTrigger>
        <TooltipContent className="p-0 px-3 py-1 rounded-full z-[202] text-[0.6rem]">
          View Project Live
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
