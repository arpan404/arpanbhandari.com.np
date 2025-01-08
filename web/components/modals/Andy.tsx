'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { cn } from '@/lib/utils';
import useStore from '@/lib/store';
import AndyWelcome from '@/components/andy/AndyWelcome';
import MessageContainer from '@/components/andy/MessageContainer';
import {
   Sheet,
   SheetContent,
   SheetTitle,
   SheetTrigger,
} from '@/components/ui/sheet';

export default function Andy({
   buttonText,
   className,
}: Readonly<{ buttonText: string; className?: string }>) {
   const userDetails = useStore(state => state.userDetails);
   const setUserDetails = useStore(state => state.setUserDetails);

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

   const slideVariants = {
      initial: (direction: number) => ({
         x: direction > 0 ? '100%' : '-100%',
         opacity: 0,
      }),
      animate: {
         x: 0,
         opacity: 1,
         transition: {
            x: { type: 'spring', stiffness: 300, damping: 30, bounce: 0 },
            opacity: { duration: 0.4, ease: 'easeInOut' },
         },
      },
      exit: (direction: number) => ({
         x: direction < 0 ? '100%' : '-100%',
         opacity: 0,
         transition: {
            x: { type: 'spring', stiffness: 300, damping: 30, bounce: 0 },
            opacity: { duration: 0.4, ease: 'easeInOut' },
         },
      }),
   };

   return (
      <Sheet>
         <SheetTrigger
            className={cn(
               'text-xs px-6 py-3 rounded-full font-semibold text-pretty cursor-pointer dark:bg-[#ff7d37] bg-[#ff6730] hover:dark:bg-[#ff7d37] hover:bg-[#ff6730] hover:cursor-pointer saturate-[110%] hover:saturate-[130%] active:opacity-50 transition-all delay-0 ease-linear m-0 text-white select-none',
               className
            )}
         >
            <h3>{buttonText}</h3>
         </SheetTrigger>

         <SheetContent className="w-full sm:max-w-[350px] md:max-w-[400px] lg:max-w-[500px] lg:w-[600px] cursor-default z-[204] px-0 md:px-0 py-0 md:py-0">
            <SheetTitle className="sr-only">Andy Chat Dialog</SheetTitle>
            <div className="relative overflow-hidden h-full">
               <AnimatePresence
                  initial={false}
                  mode="wait"
                  custom={userDetails ? 1 : -1}
               >
                  {userDetails ? (
                     <motion.div
                        key="message-container"
                        custom={1}
                        variants={slideVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute inset-0 w-full h-full"
                     >
                        <MessageContainer />
                     </motion.div>
                  ) : (
                     <motion.div
                        key="andy-welcome"
                        custom={-1}
                        variants={slideVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute inset-0 w-full h-full"
                     >
                        <AndyWelcome />
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
         </SheetContent>
      </Sheet>
   );
}
