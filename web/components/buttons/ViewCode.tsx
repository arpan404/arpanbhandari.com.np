import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Code } from 'lucide-react';
export default function ViewCode({ url }: { url: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={url} target="_blank">
            <Button
              variant={'outline'}
              size={'icon'}
              className="rounded-full h-10 w-10"
            >
              <Code />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent className="p-0 px-3 py-1 rounded-full z-[202] text-[0.6rem]">
          View Source Code
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
