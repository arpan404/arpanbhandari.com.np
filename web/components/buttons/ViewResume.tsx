import React from 'react';
import { cn } from '@/lib/utils';
import OrangeButton from './OrangeButton';

export default function ViewResume({
  url,
  className,
}: Readonly<{ url: string; className?: string }>) {
  return (
    <OrangeButton className={cn('', className)}>View My Resume</OrangeButton>
  );
}
