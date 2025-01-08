import React from 'react';

import WritingCard from '@/components/cards/WritingCard';
import { WritingCardsQueryResponse } from '@/types/response';

export default function WritingCollection({
   data,
}: {
   data: WritingCardsQueryResponse;
}) {
   return (
      <section className="flex justify-center px-2 sm:px-4 py-10">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-12 gap-6">
            {data &&
               data.articles.map(article => {
                  return <WritingCard key={article.title} {...article} />;
               })}
         </div>
      </section>
   );
}
