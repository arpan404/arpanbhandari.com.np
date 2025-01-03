import getWriting from '@/actions/getWriting';
import { redirect } from 'next/navigation';
import React from 'react';
import { metadata as notFoundMetadata } from '@/app/not-found';
import { Metadata } from 'next';
import Image from 'next/image';
import ReadTime from '@/components/common/ReadTime';
import { formatTimestamp } from '@/lib/date';
import { Calendar, Dot, Tag } from 'lucide-react';
import WritingBreadcrumb from '@/components/navs/WritingBreadcrumb';
import WritingShare from '@/components/cards/WritingShare';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';

export const generateMetadata = async (props: {
  params: Promise<{ uid: string }>;
}) => {
  const params = await props.params;
  const uid = await params.uid;
  if (!uid) return notFoundMetadata;
  const data = await getWriting(params.uid);
  if (!data) return notFoundMetadata;
  return {
    title: data.articles[0].title + ' | Arpan Bhandari (The Developer)',
    description: data.articles[0].description,
    openGraph: {
      type: 'website',
      url: `https://arpanbhandari.com.np/${params.uid}`,
      title: 'data.articles[0].title ' + ' | Arpan Bhandari (The Developer)',
      description: data.articles[0].description,
      siteName: "Arpan Bhandari's Porfolio",
      images: [
        `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.articles[0].thumbnail.url}`,
      ],
      locale: 'en_US',
    },
  } as Metadata;
};

export default async function Page(props: {
  params: Promise<{ uid: string }>;
}) {
  const params = await props.params;
  const uid = params.uid;
  if (!uid) redirect('/notfound');

  const data = await getWriting(uid);
  if (!data) redirect('/notfound');
  const article = data.articles[0];
  return (
    <>
      <main className="container mx-auto pt-[52px]">
        <div className="px-2 pt-2 pb-4">
          <WritingBreadcrumb />
        </div>
        <div className="w-full lg:w-[1000px] mx-auto relative">
          <div className="w-full max-h-[70dvh] overflow-hidden rounded-t-xl sm:rounded-t-2xl lg:rounded-t-3xl bg-transparent">
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${article.thumbnail.url}`}
              alt="thumbnail"
              height={1080 / 2}
              width={1920 / 2}
              className="object-cover w-full h-full"
              draggable={false}
              loading="lazy"
            />
          </div>
          <div className="relative -top-[80px] sm:-top-[120px] md:-top-[160px] lg:-top-[200px] bg-background py-4 md:py-8 w-[95%] sm:w-[90%] mx-auto rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl px-4 sm:px-6 md:px-8">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-primary/90">
                {article.title}
              </h1>
            </div>
            <div className="pt-6 md:pt-8">
              <div className="flex justify-start gap-2 flex-wrap items-center">
                <div className="flex gap-0 items-center">
                  <div className="text-primary/70 font-medium text-sm flex items-center gap-1">
                    <Calendar size={16} />
                    <span className="block">
                      {formatTimestamp(article.createdAt)}
                    </span>
                  </div>
                  <span className="block">
                    <Dot />
                  </span>
                  <ReadTime html={article.body} />
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`/writings?type=${article.type.uid}`}>
                        <Button
                          variant={'outline'}
                          size={'icon'}
                          className="rounded-full text-[0.6rem] w-fit font-medium px-2 py-1 h-fit mx-1 text-primary/80"
                        >
                          <Tag size={8} className="text-[0.5rem]" />
                          <span className="">{article.type.name}</span>
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="p-0 px-3 py-1 rounded-full z-[180] text-[0.6rem]">
                      View Similar Writings
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex justify-end pt-4">
                <WritingShare title={article.title} />
              </div>
            </div>
            <article
              dangerouslySetInnerHTML={{ __html: article.body }}
              className="writing_body mt-4 md:mt-8"
            />
            <div className="flex justify-end relative top-[80px] py-4 sm:py-0 text-sm font-medium text-primary/70">
              Last Updated: {formatTimestamp(article.updatedAt)}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
