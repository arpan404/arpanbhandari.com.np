import { Copyright } from 'lucide-react';

export default function Footer() {
   return (
      <footer className="bg-background py-4 flex justify-center drop-shadow-sm z-0 select-none">
         <div>
            <div className="flex gap-[4px] text-sm items-center text-center text-primary">
               <Copyright size={14} />
               Copyright 2025{' '}
               <span className="font-semibold">Arpan Bhandari</span>
            </div>
            <div className="flex justify-center text-xs font-medium relative top-1 text-primary/80">
               <span>All rights reserved.</span>
            </div>
         </div>
      </footer>
   );
}
