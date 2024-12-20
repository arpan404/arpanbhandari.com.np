'use client';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export default function Andy({
  buttonText,
  className,
}: Readonly<{ buttonText: string; className?: string }>) {
  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          'text-xs px-6 py-[0.6rem] rounded-full font-semibold text-pretty cursor-pointer dark:bg-[#ff7d37] bg-[#ff6730] hover:dark:bg-[#ff7d37] hover:bg-[#ff6730] hover:cursor-pointer saturate-[110%] hover:saturate-[130%] active:opacity-50 transition-all delay-0 ease-linear m-0',
          className
        )}
      >
        <h3 className="text-xs font-semibold text-white">{buttonText}</h3>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[400px] md:w-[500px] lg:w-[600px]">
        <SheetTitle>Hello</SheetTitle>
      </SheetContent>
    </Sheet>
  );
}
