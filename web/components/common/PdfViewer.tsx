'use client';

import { cn } from '@/lib/utils';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from '@/components/ui/animated-modal';

import { CloudDownload } from 'lucide-react';

import {
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
  TooltipContent,
} from '@/components/ui/tooltip';

import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useEffect, useState, useRef } from 'react';

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
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const pdfViewerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
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

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';
  }, []);
  const onLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
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
            <div className="flex justify-end">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="bg-secondary p-3 rounded-full opacity-80 hover:opacity-100 transition-all ease-in-out delay-75 relative right-4">
                    <a href={pdfUrl} target="_blank" download>
                      <CloudDownload size={20} />
                      <span className="sr-only">Download this file</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent className="z-[210] text-xs bg-primary py-1 px-3 text-[0.65rem] rounded-full">
                    <div>Download</div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div
              className="justify-center mt-2 flex justify-center overflow-hidden"
              ref={pdfViewerRef}
            >
              <div className="w-fit border-2 border-b-0 overflow-y-scroll custom_page_scroll rounded-xl rounded-b-[0px]">
                <Document
                  file={pdfUrl}
                  onLoadSuccess={onLoadSuccess}
                  className=""
                >
                  <Page pageNumber={pageNumber} width={width} />
                </Document>
              </div>
            </div>
          </ModalContent>
        </ModalBody>
      </Modal>
    </>
  );
}
