import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function OrangeButton({
  className,
  children,
}: Readonly<{ children: ReactNode; className?: string }>) {
  return (
    <Button
      className={cn(
        'text-xs px-6 py-3 rounded-full font-semibold text-pretty cursor-pointer dark:bg-[#ff7d37] bg-[#ff6730] hover:dark:bg-[#ff7d37] hover:bg-[#ff6730] hover:cursor-pointer saturate-[110%] hover:saturate-[130%] active:opacity-50 transition-all delay-0 ease-linear m-0 text-white',
        className
      )}
    >
      {children}
    </Button>
  );
}
