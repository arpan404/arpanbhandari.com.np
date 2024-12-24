'use client';
export default function HorizontalScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-initial gap-4 overflow-x-scroll scrollbar-hide">
        {
            children
        }
    </div>
  );
}
