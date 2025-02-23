'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Project from '@/types/project';
import ProjectCard from '@/components/cards/ProjectCard';

export default function ProjectCollection({
   projects,
}: {
   projects: Array<Project>;
}) {
   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
   return (
      <div className="flex justify-center py-10">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, index: number) => (
               <div
                  key={project.uid}
                  className="relative group block p-3 h-full w-full"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
               >
                  <AnimatePresence>
                     {hoveredIndex === index && (
                        <motion.span
                           className="absolute inset-0 h-full w-full bg-secondary block rounded-[30px] z-0"
                           layoutId="hoverBackground"
                           initial={{ opacity: 0 }}
                           animate={{
                              opacity: 1,
                              transition: {
                                 duration: 0.2,
                                 delay: 0.15,
                              },
                           }}
                           exit={{
                              opacity: 0,
                              transition: {
                                 duration: 0.1,
                                 delay: 0.15,
                              },
                           }}
                        />
                     )}
                  </AnimatePresence>

                  <ProjectCard project={project} />
               </div>
            ))}
         </div>
      </div>
   );
}
