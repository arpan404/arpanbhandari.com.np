'use client';

// This file is meant to be only be used to project modal, so all code is written in this file except useOutsideClick hook.

import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { cn } from '@/lib/utils';
import { useOutsideClick } from '@/hooks/useOutsideClick';

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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { setOpen, setTriggerRect } = useModal();

  const handleClick = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) {
      setTriggerRect(rect);
      setOpen(true);
    }
  };

  return (
    <button
      ref={triggerRef}
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
  const { open, triggerRect, setOpen } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  useOutsideClick(modalRef, () => setOpen(false));

  const modalVariants = {
    initial: {
      opacity: 0,
      scale: 0,
      x: triggerRect
        ? triggerRect.left - window.innerWidth / 2 + triggerRect.width / 2
        : 0,
      y: triggerRect
        ? triggerRect.top - window.innerHeight / 2 + triggerRect.height / 2
        : 0,
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
    },
    exit: {
      opacity: 0,
      scale: 0,
      x: triggerRect
        ? triggerRect.left - window.innerWidth / 2 + triggerRect.width / 2
        : 0,
      y: triggerRect
        ? triggerRect.top - window.innerHeight / 2 + triggerRect.height / 2
        : 0,
    },
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-[200] overflow-y-auto">
          <Overlay />
          <motion.div
            ref={modalRef}
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={modalVariants.transition}
            className={cn(
              'bg-background dark:border border-muted rounded-md md:rounded-2xl relative z-50 w-[95%] max-w-3xl max-h-[90dvh] md:max-h-[85dvh] overflow-y-auto',
              className
            )}
          >
            <CloseIcon />
            {children}
          </motion.div>
        </div>
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
