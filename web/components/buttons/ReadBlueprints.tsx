import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { Button } from '../ui/button';
export default function ReadBlueprints({ url }: { url: string }) {
  console.log(url);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={url} target="_blank">
            <Button className="rounded-full h-10 px-6 md:px-8">
              Read Blueprint
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
