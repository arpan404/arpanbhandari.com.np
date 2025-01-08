'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
   motion,
   useTransform,
   AnimatePresence,
   useMotionValue,
   useSpring,
} from 'framer-motion';

import Project from '@/types/project';

export default function TechnologiesTooltip({
   data,
}: {
   data: Project['technologiesUsed'];
}) {
   const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
   const springConfig = { stiffness: 100, damping: 5 };
   const x = useMotionValue(0);

   const rotate = useSpring(
      useTransform(x, [-100, 100], [-45, 45]),
      springConfig
   );
   const translateX = useSpring(
      useTransform(x, [-100, 100], [-50, 50]),
      springConfig
   );
   const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      const halfWidth = event.currentTarget.offsetWidth / 2;
      x.set(event.nativeEvent.offsetX - halfWidth);
   };

   return (
      <div className="flex flex-row items-center justify-start w-full flex-wrap gap-1 select-none">
         {data.map(
            (item: {
               skill: {
                  uid: string;
                  name: string;
                  logo?: { url: string };
               };
            }) => (
               <div
                  className="-mr-2  relative group"
                  key={item.skill.uid}
                  onMouseEnter={() => setHoveredIndex(item.skill.uid)}
                  onMouseLeave={() => setHoveredIndex(null)}
               >
                  <AnimatePresence mode="popLayout">
                     {hoveredIndex === item.skill.uid && (
                        <motion.div
                           initial={{ opacity: 0, y: 20, scale: 0.6 }}
                           animate={{
                              opacity: 1,
                              y: 0,
                              scale: 1,
                              transition: {
                                 type: 'spring',
                                 stiffness: 260,
                                 damping: 10,
                              },
                           }}
                           exit={{ opacity: 0, y: 20, scale: 0.6 }}
                           style={{
                              translateX: translateX,
                              rotate: rotate,
                              whiteSpace: 'nowrap',
                           }}
                           className="absolute -top-8 -left-1/2 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-full bg-primary z-50 shadow-xl px-2 py-1"
                        >
                           <div className="absolute inset-x-5 z-[202] w-[20%] -bottom-px bg-gradient-to-r from-transparent via-orange-500 to-transparent h-px " />
                           <div className="absolute left-4 w-[40%] z-[202] -bottom-px bg-gradient-to-r from-transparent via-red-500 to-transparent h-px " />
                           <div className="font-semibold text-background relative z-[202] text-xs">
                              {item.skill.name}
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>
                  <div
                     className={`w-[40px] h-[40px] max-w-[40px] max-h-[40px] overflow-hidden cursor-pointer group-hover:scale-105 rounded-full flex justify-center items-center p-[6px] group-hover:z-30  relative transition duration-500 border-[1px] border-secondary bg-muted drop-shadow-xl`}
                  >
                     <Image
                        onMouseMove={handleMouseMove}
                        height={100}
                        width={100}
                        priority={true}
                        draggable={false}
                        src={
                           item.skill.logo
                              ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.skill.logo.url}`
                              : '/images/image-not-found-icon.png'
                        }
                        alt={item.skill.name}
                        className={`w-auto h-auto max-h-full max-w-full object-cover !m-0 !p-0 object-top rounded-md ${
                           item.skill.logo ? '' : 'dark:invert !p-1'
                        }`}
                     />
                  </div>
               </div>
            )
         )}
      </div>
   );
}
