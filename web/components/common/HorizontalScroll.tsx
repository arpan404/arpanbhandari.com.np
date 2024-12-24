'use client';
import { ChevronLeft } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

export default function HorizontalScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -286, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 286, behavior: 'smooth' });
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

  console.log('canScrollLeft', canScrollLeft);
  return (
    <div className="relative">
      <button
        onClick={scrollLeft}
        className="absolute left-0 z-10 top-0 h-full"
        disabled={!canScrollLeft}
      >
        <ChevronLeft size={50} />
      </button>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-scroll scrollbar-hide h-fit"
      >
        {children}
      </div>
      <button
        onClick={scrollRight}
        className="absolute right-0 z-10 p-2 bg-gray-200 rounded-full bottom-0 h-full"
        disabled={!canScrollRight}
      >
        &gt;
      </button>
    </div>
  );
}
