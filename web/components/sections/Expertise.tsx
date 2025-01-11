import Link from 'next/link';

import Skill from '@/components/buttons/Skill';
import { Button } from '@/components/ui/button';
import fetchNextAPI from '@/actions/fetchNextAPI';
import PdfViewer from '@/components/modals/PdfViewer';
import {
   FeaturedSkillsQueryResponse,
   ResumeQueryResponse,
} from '@/types/response';

export default async function Expertise() {
   const [skillsData, resumeData] = await Promise.all([
      fetchNextAPI<FeaturedSkillsQueryResponse>('/api/featuredSkills', 7200),
      fetchNextAPI<ResumeQueryResponse>('/api/resume', 7200 * 2),
   ]);

   return (
      <section
         className="py-10 sm:py-16 md:py-20 bg-background"
         id="technologies"
      >
         <div className="">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center select-none">
               What do{' '}
               <span className="dark:text-[#ff7d37] text-[#ff6730] saturate-[110%]">
                  I Know?
               </span>
            </h2>
         </div>
         <div className="mt-4 md:mt-8 px-4 md:flex-1 space-y-4 md:space-y-6">
            <div className="flex justify-center mt-8 md:mt-10">
               <p>
                  <span className="text-base md:text-lg font-semibold text-primary/80">
                     Worked on a variety of technologies and tools, but right
                     now, I&apos;m actively working with:
                  </span>
               </p>
            </div>
            <div className="flex justify-center py-2">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 container gap-2 md:gap-4">
                  {skillsData &&
                     skillsData.featuredSkills?.skills.map(skill => (
                        <Skill
                           key={skill.skill.uid}
                           name={skill.skill.name}
                           uid={skill.skill.uid}
                        />
                     ))}
               </div>
            </div>
            <div className="flex justify-center py-4">
               <div className="container px-2 md:px-8 flex flex-wrap gap-6 md:gap-0">
                  <div className="text-base md:w-1/2 w-full px-2 md:px-0">
                     <p className="text-left">
                        My expertise extends far beyond specific technologies.
                        I&apos;ve had the opportunity to work on a variety of
                        projects, which have provided me with a deep
                        understanding of software engineering principles and
                        practices. I&apos;m a quick learner, allowing me to
                        adapt seamlessly to new technologies and contribute
                        meaningfully to any project I take on.
                     </p>
                  </div>
                  <div className="flex justify-center items-center w-full md:w-1/2 px-2 md:px-0 md:relative md:-top-2">
                     <div className="space-y-3">
                        <div className="">
                           <h2 className="text-center select-none">
                              Want to know more about my expertise?
                           </h2>
                        </div>
                        <div className="flex gap-4 flex-wrap">
                           <div className="flex justify-center w-full lg:w-fit">
                              <Link href="/projects">
                                 <Button className="text-xs md:text-sm font-medium rounded-full px-6 py-3 hover:scale-110 transition-all ease-in delay-75 select-none">
                                    View My Projects
                                 </Button>
                              </Link>
                           </div>
                           <div className="flex justify-center w-full lg:w-fit">
                              {resumeData?.resume?.file?.url && (
                                 <>
                                    <PdfViewer
                                       pdfUrl={
                                          process.env.NEXT_PUBLIC_STRAPI_URL +
                                          resumeData.resume.file.url
                                       }
                                       modalTriggerClassName="text-xs md:text-sm font-medium px-6 py-2 hover:scale-110 transition-all ease-in delay-75 rounded-full text-pretty cursor-pointer dark:bg-[#ff7d37] bg-[#ff6730] hover:dark:bg-[#ff7d37] hover:bg-[#ff6730] hover:cursor-pointer saturate-[110%] hover:saturate-[130%] active:opacity-50 transition-all delay-0 ease-linear m-0 text-white select-none"
                                    >
                                       View My Resume
                                    </PdfViewer>
                                 </>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
