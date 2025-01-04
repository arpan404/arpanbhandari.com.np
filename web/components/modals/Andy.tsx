'use client';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import AndyAvatar from '@/components/common/AndyAvatar';
import { useEffect } from 'react';
import useStore from '@/lib/store';
import MessageContainer from '@/components/common/MessageContainer';
import AndyWelcome from '@/components/common/AndyWelcome';

export default function Andy({
  buttonText,
  className,
}: Readonly<{ buttonText: string; className?: string }>) {
  const userDetails = useStore(state => state.userDetails);
  const message = useStore(state => state.messages);
  const setMessage = useStore(state => state.setMessage);
  const setUserDetails = useStore(state => state.setUserDetails);
  const addMessage = useStore(state => state.addMessage);

  useEffect(() => {
    if (!userDetails) {
      const userDetails = localStorage.getItem('userDetails');
      if (userDetails) {
        try {
          setUserDetails(JSON.parse(userDetails));
        } catch (e) {
          localStorage.removeItem('userDetails');
        }
      }
    }
  }, []);

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

      <SheetContent className="w-full sm:w-[400px] md:w-[500px] lg:w-[600px] cursor-default z-[101] px-0 md:px-0 py-0 md:py-0">
        <SheetTitle className="sr-only">Andy Chat Dialog</SheetTitle>
        {userDetails && <MessageContainer />}
        {!userDetails && <AndyWelcome />}
      </SheetContent>
    </Sheet>
  );
}
