import { Copyright } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background py-4 flex justify-center drop-shadow-sm">
      <div className="">
        <div className="flex gap-1 text-sm items-center text-center text-primary">
          <Copyright size={14} /> Copyright 2025 Arpan Bhandari
        </div>
        <div className="flex justify-center text-xs font-medium relative top-1 opacity-80">
          <span className="">All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
