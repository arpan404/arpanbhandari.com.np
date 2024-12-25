'use client';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface ModalContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRect: DOMRect | null;
  setTriggerRect: (rect: DOMRect | null) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
  console.log('🚀 ~ ModalProvider ~ triggerRect:', triggerRect);

  return (
    <ModalContext.Provider
      value={{
        open,
        setOpen,
        triggerRect,
        setTriggerRect,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export function Modal({ children }: { children: ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>;
}

export const ModalTrigger = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { setOpen, setTriggerRect } = useModal();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTriggerRect(rect);
    setOpen(true);
  };

  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md text-primary text-center relative overflow-hidden',
        className
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export const ModalBody = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { open, triggerRect } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);
  const { setOpen } = useModal();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  useOutsideClick(modalRef, () => setOpen(false));
  console.log(
    'Trigger Rect X:',
    triggerRect ? triggerRect.left + triggerRect.width / 2 : 0
  );
  console.log(
    'Trigger Rect Y:',
    triggerRect ? triggerRect.top + triggerRect.height / 2 : 0
  );
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 flex items-baseline justify-center z-[200] py-10 overflow-y-scroll min-h-screen overflow-x-hidden bg-transparent">
          <Overlay />

          <motion.div
            ref={modalRef}
            initial={{
              opacity: 0,
              x: triggerRect ? triggerRect.left + triggerRect.width / 2 : 0,
              y: triggerRect ? triggerRect.top + triggerRect.height / 2 : 0,
              width: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
              width: '100%',
              height: '100%',
            }}
            exit={{
              opacity: 0,
              x: triggerRect ? triggerRect.left + triggerRect.width / 2 : 0,
              y: triggerRect ? triggerRect.top + triggerRect.height / 2 : 0,
              width: triggerRect ? triggerRect.width : 'auto',
              height: triggerRect ? triggerRect.height : 'auto',
            }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 30,
              duration: 0.3,
            }}
            className={cn(
              'bg-background dark:border border-muted rounded-md md:rounded-2xl relative z-50 flex flex-col flex-1 overflow-y-scroll overflow-x-hidden',
              className
            )}
          >
            <CloseIcon />
            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ModalContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex flex-col flex-1 p-8 md:p-10', className)}>
      {children}
    </div>
  );
};

export const ModalFooter = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex justify-end p-4 bg-background', className)}>
      {children}
    </div>
  );
};

const Overlay = ({ className }: { className?: string }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className={`fixed inset-0 h-full w-full bg-black bg-opacity-30 z-50 backdrop-blur-[10px] ${className}`}
    ></motion.div>
  );
};

const CloseIcon = () => {
  const { setOpen } = useModal();
  return (
    <div className="sm:scale-150 absolute top-4 right-4 md:top-6 sm:right-6">
      <button
        onClick={() => setOpen(false)}
        className="group bg-secondary/85 hover:bg-secondary/100 p-1 sm:p-2 rounded-full text-primary hover:rotate-90 hover:scale-105 transition delay-100 ease-in-out"
      >
        <X size={15} className="group-hover:scale-125" />
      </button>
    </div>
  );
};

// Hook to detect clicks outside of a component.
// Add it in a separate file, I've added here for simplicity
export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null>,
  callback: Function
) => {
  useEffect(() => {
    const listener = (event: any) => {
      // DO NOTHING if the element being clicked is the target element or their children
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, callback]);
};
