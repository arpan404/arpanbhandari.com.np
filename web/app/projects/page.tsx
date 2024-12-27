// import { Button } from '@/components/ui/button';
// import { ArrowLeft, ChevronLeft } from 'lucide-react';
// import Link from 'next/link';
// import { type NextRequest } from 'next/server';

// export default async function page() {

//   return (
//     <main className="bg-background pt-[52px]">
//       <div className="px-2">
//         <Link href="/">
//           <Button variant={'link'} className="px-2 rounded-full font-semibold">
//             <ChevronLeft size={20} /> Home
//             <span className="sr-only">Go back to home</span>
//           </Button>
//         </Link>
//       </div>
//       <main className="container mx-auto">
//         <div className="flex justify-center">
//           <h1>My Projects</h1>
//         </div>
//       </main>
//     </main>
//   );
// }

// app/projects/page.tsx
export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { tag, filter, sort } = await searchParams;

  return (
    <div>
      <p>Query: {tag}</p>
      <p>Filter: {filter}</p>
      <p>Sort: {sort}</p>
    </div>
  );
}
