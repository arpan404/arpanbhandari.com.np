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
    const scrollElement = scrollRef.current;

    const handleScroll = () => {
      updateScrollButtons();
    };

    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (!canScrollLeft && !canScrollRight) {
      setIsHovered(false);
    }
  }, [canScrollLeft, canScrollRight]);

  useEffect(() => {
    const handleResize = () => {
      updateScrollButtons();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
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
        className={`absolute left-0 z-20 top-0 h-full dark:text-[#ff7d37] text-[#ff6730] saturate-[110%] hover:saturate-[130%]  bg-gradient-to-r rounded-md from-black/[0.05] transition-all duration-75 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        } ${canScrollLeft ? 'block' : 'hidden'}`}
      >
        <ChevronLeft size={50} fontWeight={900} className="drop-shadow-2xl" />
        <span className="sr-only">Scroll left</span>
      </button>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-scroll scrollbar-hide h-fit"
      >
        {children}
      </div>
      <button
        onClick={scrollRight}
        className={`absolute right-0 z-20 top-0 h-full dark:text-[#ff7d37] text-[#ff6730] saturate-[110%] hover:saturate-[130%] rounded-md bg-gradient-to-l from-black/[0.05] to-transparent transition-all duration-75 ${
          isHovered ? 'opacity-100 ' : 'opacity-0'
        } ${canScrollRight ? 'block' : 'hidden'}`}
      >
        <ChevronRight size={50} fontWeight={900} />
        <span className="sr-only">Scroll right</span>
      </button>
      <div
        className={`absolute top-0 left-0 h-full w-12 bg-transparent pointer-events-none ${
          canScrollLeft ? 'block' : 'hidden'
        } ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        className={`absolute top-0 right-0 h-full w-12 bg-transparent pointer-events-none ${
          canScrollLeft ? 'block' : 'hidden'
        } ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
