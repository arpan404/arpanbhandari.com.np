'use client';
import { useState } from 'react';
import { formatTimestamp } from '@/lib/date';

export default function FormattedDate({ date }: { date: string }) {
   const [formattedDate] = useState<string>(
      formatTimestamp(date)
   );
   return <>{formattedDate}</>;
}
