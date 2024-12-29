import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { formatTimestamp } from '@/lib/date';
import { WritingCard as WritingCardType } from '@/types/writing';

export default function WritingCard(props: WritingCardType) {
  return (
    <Card className="w-full max-w-[300px] rounded-2xl relative pb-2">
      <CardHeader className="px-0 py-0">
        <div className="flex justify-center h-[170px] rounded-t-2xl overflow-hidden">
          <Link href={`/writings/${props.uid}`} className="w-full h-full">
            <Image
              className="w-full h-full object-cover"
              src={props.thumbnail.url}
              height={320}
              width={320}
              alt={`Thumbnail of writing titled ${props.title}`}
              draggable={false}
              loading="eager"
            />
          </Link>
        </div>
        <CardTitle className="font-medium pb-0 px-4 py-2">
          <Link
            href={`/writings/${props.uid}`}
            className="hover:underline underline-offset-2 line-clamp-2 text-lg text-primary/90 transition-all ease-in-out delay-100"
          >
            {props.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2 px-4">
        <p className="line-clamp-3 text-[0.7rem] text-muted-foreground font-light">
          {props.description}
        </p>
        <div>
          <span className="text-xs text-primary/70 font-medium mt-3 block">
            {formatTimestamp(props.createdAt)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
