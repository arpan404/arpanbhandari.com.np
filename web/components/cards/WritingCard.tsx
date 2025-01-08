'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Tag } from 'lucide-react';

import { formatTimestamp } from '@/lib/date';
import { Button } from '@/components/ui/button';
import { WritingCard as WritingCardType } from '@/types/writing';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function WritingCard(props: WritingCardType) {
  return (
    <Card className="w-full max-w-[300px] rounded-2xl relative pb-2 drop-shadow-md flex-shrink-0 overflow-hidden z-10 bg-background">
      <CardHeader className="px-0 py-0">
        <div className="flex justify-center h-[170px] rounded-t-2xl overflow-hidden">
          <Link href={`/writings/${props.uid}`} className="w-full h-full">
            <Image
              className="w-full h-full object-cover select-none"
              src={process.env.NEXT_PUBLIC_STRAPI_URL + props.thumbnail.url}
              height={320}
              width={320}
              alt={`Thumbnail of writing titled ${props.title}`}
              draggable={false}
              loading="lazy"
            />
          </Link>
        </div>
        <CardTitle className="font-medium pb-0 px-4 py-2 min-h-[88px]">
          <Link
            href={`/writings/${props.uid}`}
            className="hover:underline underline-offset-2 line-clamp-3 text-base text-primary/90 transition-all ease-in-out delay-100"
          >
            {props.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2 px-4">
        <p className="line-clamp-4 text-[0.7rem] text-muted-foreground font-light">
          {props.description}
        </p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-xs text-primary/70 font-medium block">
            {formatTimestamp(props.createdAt)}
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={`/writings?type=${props.type.uid}`}>
                  <Button
                    variant={'outline'}
                    size={'icon'}
                    className="rounded-full text-[0.6rem] w-fit font-medium px-2 py-1 h-fit mx-1 text-primary/80"
                  >
                    <Tag size={8} className="text-[0.5rem]" />
                    <span className="select-none">{props.type.name}</span>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="p-0 px-3 py-1 rounded-full z-[180] text-[0.6rem]">
                View Similar Writings
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}
