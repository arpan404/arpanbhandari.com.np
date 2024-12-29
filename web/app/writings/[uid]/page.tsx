import getWriting from '@/actions/getWriting';
import { redirect } from 'next/navigation';
import React from 'react';
import { metadata as notFoundMetadata } from '@/app/not-found';
import { Metadata } from 'next';
import Image from 'next/image';

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
    twitter: {
      card: 'summary_large_image',
      site: '@arpanbhandari01',
      title: 'data.articles[0].title ' + ' | Arpan Bhandari (The Developer)',
      description: data.articles[0].description,
      images: [
        `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.articles[0].thumbnail.url}`,
      ],
    },
    image: data.articles[0].thumbnail.url,
  } as Metadata;
};

export default async function Page(props: {
  params: Promise<{ uid: string }>;
}) {
  const params = await props.params;
  const uid = await params.uid;
  if (!uid) redirect('/notfound');

  const data = await getWriting(uid);
  if (!data) redirect('/notfound');
  const article = data.articles[0];
  return (
    <>
      <div className="pt-[52px]">
        <div>Home &gt; Writings &gt; ..</div>
      </div>
      <main className="container mx-auto">
        <div className="w-full lg:w-[1000px] mx-auto relative">
          <div className="w-full max-h-[70dvh] overflow-hidden rounded-t-xl sm:rounded-t-2xl lg:rounded-t-3xl bg-transparent">
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${article.thumbnail.url}`}
              alt="thumbnail"
              height={1080 / 2}
              width={1920 / 2}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="relative -top-[80px] sm:-top-[160px] bg-background py-4 md:py-8 w-[95%] sm:w-[90%] mx-auto rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl px-4 sm:px-6 md:px-8">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-primary/80">
                {article.title}
              </h1>
            </div>
            <article
              dangerouslySetInnerHTML={{ __html: article.body }}
              className="writing_body"
            ></article>
          </div>
        </div>
      </main>
    </>
  );
}
