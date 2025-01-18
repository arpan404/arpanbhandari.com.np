'use client';

import 'react-pdf/dist/esm/Page/TextLayer.css';
import { pdfjs, Document, Page } from 'react-pdf';
import { useEffect, useState, useRef } from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { ChevronLeft, ChevronRight, CloudDownload } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
   Modal,
   ModalBody,
   ModalContent,
   ModalTrigger,
} from '@/components/ui/animated-modal';
import {
   Tooltip,
   TooltipTrigger,
   TooltipProvider,
   TooltipContent,
} from '@/components/ui/tooltip';

export default function PdfViewer({
   modalTriggerClassName,
   modalClassName,
   pdfUrl,
   children,
}: {
   modalTriggerClassName?: string;
   modalClassName?: string;
   pdfUrl: string;
   children: React.ReactNode;
}) {
   const [pdfData, setPdfData] = useState<string>('');
   const [numPages, setNumPages] = useState<number>(0);
   const [pageNumber, setPageNumber] = useState(1);
   const pdfViewerRef = useRef<HTMLDivElement>(null);
   const [width, setWidth] = useState<number>(0);

   useEffect(() => {
      fetch(pdfUrl)
         .then(response => response.blob())
         .then(blob => {
            const pdfUrl = URL.createObjectURL(blob);
            setPdfData(pdfUrl);
         })
         .catch(error => console.error('Error fetching PDF:', error));
   }, [pdfUrl]);
   useEffect(() => {
      pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/pdf.worker.min.mjs`;
   }, []);

   useEffect(() => {
      const updateDimensions = () => {
         if (pdfViewerRef.current) {
            setWidth(pdfViewerRef.current.clientWidth);
         }
      };

      updateDimensions();

      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
   }, [pdfViewerRef]);

   const onLoadSuccess = ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
      if (pdfViewerRef.current) setWidth(pdfViewerRef.current.clientWidth);
   };

   const goToNextPage = () => {
      if (pageNumber < numPages) {
         setPageNumber(pageNumber + 1);
      }
   };

   const goToPreviousPage = () => {
      if (pageNumber > 1) {
         setPageNumber(pageNumber - 1);
      }
   };

   return (
      <>
         <Modal>
            <ModalTrigger className={cn('', modalTriggerClassName)}>
               <span>{children}</span>
            </ModalTrigger>
            <ModalBody className="z-[200]">
               <ModalContent
                  className={cn(
                     'w-full h-full overflow-y-hidden pb-0 md:pb-0',
                     modalClassName
                  )}
               >
                  <div className="flex justify-evenly px-1">
                     {numPages > 1 && (
                        <div className="flex gap-2">
                           <TooltipProvider>
                              <Tooltip>
                                 <TooltipTrigger
                                    className={`bg-secondary p-3 rounded-full opacity-90 hover:opacity-100 transition-all ease-in-out delay-75 relative
                        text-primary ${
                           pageNumber === 1
                              ? 'cursor-default'
                              : 'cursor-pointer'
                        }`}
                                    onClick={goToPreviousPage}
                                 >
                                    <ChevronLeft
                                       size={20}
                                       className={
                                          pageNumber === 1
                                             ? 'opacity-50'
                                             : 'opacity-100'
                                       }
                                    />
                                    <span className="sr-only">
                                       Previous Page
                                    </span>
                                 </TooltipTrigger>
                                 <TooltipContent className="z-[210] text-xs bg-primary py-1 px-3 text-[0.65rem] rounded-full">
                                    <div>Previous Page</div>
                                 </TooltipContent>
                              </Tooltip>
                           </TooltipProvider>
                           <TooltipProvider>
                              <Tooltip>
                                 <TooltipTrigger
                                    className={`bg-secondary p-3 rounded-full opacity-90 hover:opacity-100 transition-all ease-in-out delay-75 relative
                        text-primary ${
                           pageNumber === numPages
                              ? 'cursor-default'
                              : 'cursor-pointer'
                        }`}
                                    onClick={goToNextPage}
                                 >
                                    <ChevronRight
                                       size={20}
                                       className={
                                          pageNumber === numPages
                                             ? 'opacity-50'
                                             : 'opacity-100'
                                       }
                                    />
                                    <span className="sr-only">Next Page</span>
                                 </TooltipTrigger>
                                 <TooltipContent className="z-[210] text-xs bg-primary py-1 px-3 text-[0.65rem] rounded-full">
                                    <div>Next Page</div>
                                 </TooltipContent>
                              </Tooltip>
                           </TooltipProvider>
                        </div>
                     )}
                     <div className="flex items-center relative flex-1 justify-center">
                        {numPages > 1 && (
                           <span className="text-primary/80 font-medium text-sm">
                              {pageNumber} / {numPages}
                           </span>
                        )}
                     </div>
                     <div className="">
                        <TooltipProvider>
                           <Tooltip>
                              <TooltipTrigger className="bg-secondary p-3 rounded-full opacity-80 hover:opacity-100 transition-all ease-in-out delay-75">
                                 <a href={pdfUrl} target="_blank" download>
                                    <CloudDownload size={20} />
                                    <span className="sr-only">
                                       Download this file
                                    </span>
                                 </a>
                              </TooltipTrigger>
                              <TooltipContent className="z-[210] text-xs bg-primary py-1 px-3 text-[0.65rem] rounded-full">
                                 <div>Download</div>
                              </TooltipContent>
                           </Tooltip>
                        </TooltipProvider>
                     </div>
                  </div>
                  <div
                     className="justify-center mt-2 flex overflow-hidden"
                     ref={pdfViewerRef}
                  >
                     <div className="w-fit border-2 border-b-0 overflow-y-scroll custom_page_scroll rounded-xl rounded-b-[0px] overflow-x-hidden">
                        {pdfData && (
                           <Document
                              file={pdfData}
                              onLoadSuccess={onLoadSuccess}
                           >
                              <Page pageNumber={pageNumber} width={width} />
                           </Document>
                        )}
                     </div>
                  </div>
               </ModalContent>
            </ModalBody>
         </Modal>
      </>
   );
}
