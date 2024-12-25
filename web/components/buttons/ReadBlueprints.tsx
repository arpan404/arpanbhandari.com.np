import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { Button } from '../ui/button';
import { NotepadText } from 'lucide-react';
export default function ReadBlueprints({ url }: { url: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={url} target="_blank">
            <Button
              className="rounded-xl h-10 w-10 sm:w-fit px-0 sm:px-4 md:px-6 text-sm"
              variant={'default'}
            >
              <span className="hidden sm:block">Read Blueprint</span>
              <NotepadText size={20} className="sm:hidden" />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent className="p-0 px-3 py-1 rounded-full z-[202] text-[0.6rem]">
          Read My Approach to the Project
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
