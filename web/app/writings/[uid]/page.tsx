import getWriting from '@/actions/getWriting';
import { redirect } from 'next/navigation';
import React from 'react';
import { metadata as notFoundMetadata } from '@/app/not-found';
import { Metadata } from 'next';
export const generateMetadata = async (
  props: {
    params: Promise<{ uid: string }>;
  }
) => {
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

export default async function Page(props: { params: Promise<{ uid: string }> }) {
  const params = await props.params;
  const uid = await params.uid;
  if (!uid) redirect('/notfound');

  const data = await getWriting(uid);
  if (!data) redirect('/notfound');

  return <div>{uid}</div>;
}
