import { cn } from '@/lib/utils';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from '../ui/animated-modal';

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
  return (
    <>
      <Modal>
        <ModalTrigger className={cn('', modalTriggerClassName)}>
          <span>{children}</span>
        </ModalTrigger>
        <ModalBody className='z-[200]'>
          <ModalContent className={cn('w-full h-full', modalClassName)}>
            Hello
          </ModalContent>
        </ModalBody>
      </Modal>
    </>
  );
}
