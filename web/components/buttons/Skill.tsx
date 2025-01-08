import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Skill({ name, uid }: { name: string; uid: string }) {
  return (
    <div className="flex justify-center">
      <Link href={`/projects?tag=${uid}`}>
        <Button
          className="w-[240px] xl:w-[250px] h-12 rounded-full overflow-hidden relative group select-none"
          variant="outline"
        >
          {name}
          <span className="absolute w-[200%] h-60 -top-20 -left-10 bg-[#ff8e00] rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-300 duration-700 origin-left saturate-[110%] group-hover:saturate-[120%]"></span>
          <span className="absolute w-[200%] h-60 -top-20 -left-10 bg-[#fd7702] rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-500 origin-left saturate-[110%] group-hover:saturate-[120%]"></span>
          <span className="absolute w-[200%] h-60 -top-20 -left-10 dark:bg-[#ff7d37] bg-[#ff6730]  rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-300 origin-left saturate-[110%] group-hover:saturate-[120%]"></span>
          <span className="group-hover:opacity-100 group-hover:duration-100 duration-200 opacity-0 absolute top-0 left-0 z-10 text-sm flex justify-center w-full h-full items-center group-hover:text-neutral-100">
            View My Works
          </span>
        </Button>
      </Link>
    </div>
  );
}
