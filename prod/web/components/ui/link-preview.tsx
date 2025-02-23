'use client';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import Image from 'next/image';
import { encode } from 'qss';
import React from 'react';
import {
   AnimatePresence,
   motion,
   useMotionValue,
   useSpring,
} from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type LinkPreviewProps = {
   children: React.ReactNode;
   url: string;
   className?: string;
   width?: number;
   height?: number;
   quality?: number;
   layout?: string;
} & (
   | { isStatic: true; imageSrc: string }
   | { isStatic?: false; imageSrc?: never }
);

export const LinkPreview = ({
   children,
   url,
   className,
   width = 300,
   height = 150,
   quality = 50,
   isStatic = false,
   imageSrc = '',
}: LinkPreviewProps) => {
   let src;
   if (!isStatic) {
      const params = encode({
         url,
         screenshot: true,
         meta: false,
         embed: 'screenshot.url',
         colorScheme: 'dark',
         'viewport.isMobile': true,
         'viewport.deviceScaleFactor': 1,
         'viewport.width': width * 4,
         'viewport.height': height * 4,
      });
      src = `https://api.microlink.io/?${params}`;
   } else {
      src = imageSrc;
   }

   const [isOpen, setOpen] = React.useState(false);

   const [isMounted, setIsMounted] = React.useState(false);

   React.useEffect(() => {
      setIsMounted(true);
   }, []);

   const springConfig = { stiffness: 100, damping: 15 };
   const x = useMotionValue(0);

   const translateX = useSpring(x, springConfig);

   const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
      const targetRect = (event.target as HTMLElement).getBoundingClientRect();
      const eventOffsetX = event.clientX - targetRect.left;
      const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2; // Reduce the effect to make it subtle
      x.set(offsetFromCenter);
   };

   return (
      <>
         {isMounted ? (
            <div className="hidden">
               <Image
                  src={src}
                  width={width}
                  height={height}
                  quality={quality}
                  priority={true}
                  alt="hidden image"
                  draggable={false}
               />
            </div>
         ) : null}

         <HoverCardPrimitive.Root
            openDelay={50}
            closeDelay={100}
            onOpenChange={open => {
               setOpen(open);
            }}
         >
            <HoverCardPrimitive.Trigger
               onMouseMove={handleMouseMove}
               className={cn('text-primary', className)}
               href={url}
               target="_blank"
            >
               {children}
            </HoverCardPrimitive.Trigger>

            <HoverCardPrimitive.Content
               className="[transform-origin:var(--radix-hover-card-content-transform-origin)] z-40"
               side="top"
               align="center"
               sideOffset={10}
            >
               <AnimatePresence>
                  {isOpen && (
                     <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.6 }}
                        animate={{
                           opacity: 1,
                           y: 0,
                           scale: 1,
                           transition: {
                              type: 'spring',
                              stiffness: 260,
                              damping: 20,
                           },
                        }}
                        exit={{ opacity: 0, y: 20, scale: 0.6 }}
                        className="shadow-xl rounded-xl z-40"
                        style={{
                           x: translateX,
                        }}
                     >
                        <Link
                           href={url}
                           className="p-1 bg-secondary border-2 border-transparent shadow rounded-xl hover:border-primary hidden sm:block z-40"
                           style={{ fontSize: 0 }}
                           target="_blank"
                        >
                           <Image
                              src={isStatic ? imageSrc : src}
                              width={width}
                              height={height}
                              quality={quality}
                              priority={true}
                              className="rounded-lg z-40"
                              alt="preview image"
                              draggable={false}
                           />
                        </Link>
                     </motion.div>
                  )}
               </AnimatePresence>
            </HoverCardPrimitive.Content>
         </HoverCardPrimitive.Root>
      </>
   );
};
