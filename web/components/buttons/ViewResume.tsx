import { ArrowRightIcon } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';

export default function ViewResume({ url }: Readonly<{ url: string }>) {
  console.log(url);
  return (
    <Button className="text-xs sm:text-sm font-light rounded-full px-6 sm:px-10">
      View My Resume
    </Button>
  );
}
