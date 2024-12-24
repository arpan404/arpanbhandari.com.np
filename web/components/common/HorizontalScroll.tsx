'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

export default function HorizontalScroll({
  children,
  width = 286,
}: {
  children: React.ReactNode;
  width?: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -width, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: width, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    updateScrollButtons();
    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', updateScrollButtons);
    }
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', updateScrollButtons);
      }
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={scrollLeft}
        className={`absolute left-0 z-10 top-0 h-full text-gray-300 dark:text-primary bg-transparent transition-all duration-75 ${
          isHovered ? 'opacity-100 hover:text-gray-100' : 'opacity-0'
        } ${canScrollLeft ? 'block' : 'md:hidden block'}`}
      >
        <ChevronLeft size={50} fontWeight={900} className="drop-shadow-2xl" />
      </button>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-scroll scrollbar-hide h-fit"
      >
        {children}
      </div>
      <button
        onClick={scrollRight}
        className={`absolute right-0 z-10 top-0 h-full text-gray-300 dark:text-primary bg-transparent transition-all duration-75 ${
          isHovered ? 'opacity-100 hover:text-gray-100' : 'opacity-0'
        } ${canScrollRight ? 'block' : 'md:hidden block'}`}
      >
        <ChevronRight size={50} fontWeight={900} />
      </button>
      <div
        className={`absolute top-0 left-0 h-full w-12 bg-transparent dark:bg-gradient-to-r dark:from-background dark:to-transparent pointer-events-none ${
          canScrollLeft ? 'block' : 'hidden'
        } ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        className={`absolute top-0 right-0 h-full bg-transparent dark:bg-gradient-to-l dark:from-background dark:to-transparent pointer-events-none ${
          canScrollRight ? 'block' : 'hidden'
        }
        } ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}
      />
    </div>
  );
}
