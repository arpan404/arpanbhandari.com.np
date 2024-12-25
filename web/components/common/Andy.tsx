'use client';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import AndyAvatar from '@/components/common/AndyAvatar';

export default function Andy({
  buttonText,
  className,
}: Readonly<{ buttonText: string; className?: string }>) {
  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          'text-xs px-6 py-3 rounded-full font-semibold text-pretty cursor-pointer dark:bg-[#ff7d37] bg-[#ff6730] hover:dark:bg-[#ff7d37] hover:bg-[#ff6730] hover:cursor-pointer saturate-[110%] hover:saturate-[130%] active:opacity-50 transition-all delay-0 ease-linear m-0 text-white',
          className
        )}
      >
        <h3>{buttonText}</h3>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[400px] md:w-[500px] lg:w-[600px] cursor-default z-[101]">
        <SheetTitle>
          <div className="flex gap-4 items-center">
            <div className="flex items-center">
              <AndyAvatar />
            </div>
            <div className="text-primary">
              <div className="text-sm font-medium">Andy</div>
              <div className="font-light text-xs opacity-80">
                A friendly yet intelligent assistant, here to answer all your
                questions about me.
              </div>
            </div>
          </div>
        </SheetTitle>
      </SheetContent>
    </Sheet>
  );
}
