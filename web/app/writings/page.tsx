import getWritings from '@/actions/getWritingCards';
import WritingCard from '@/components/cards/WritingCard';
import React from 'react';

export default async function page() {
  const data = await getWritings();
  console.log(data);
  return (
    <div className="p-10">
      {data &&
        data.articles.map(article => (
          <WritingCard key={article.title} {...article} />
        ))}
    </div>
  );
}
