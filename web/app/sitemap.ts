import getWritingCards from '@/actions/getWritingCards';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapData: MetadataRoute.Sitemap = [
    {
      url: 'https://www.arpanbhandari.com.np/',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://www.arpanbhandari.com.np/projects',
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.arpanbhandari.com.np/writings',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  const writingData = await getWritingCards();
  
  if (writingData) {
    writingData.articles.forEach(article => {
      sitemapData.push({
        url: `https://www.arpanbhandari.com.np/writings/${article.uid}`,
        lastModified: article.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  }

  return sitemapData;
}