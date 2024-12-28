import WritingCard from '@/components/cards/WritingCard';
import React from 'react';

const mockData = {
  title:
    'Sample Title Sample Title Sample Title Sample Title How long does it really need to be a title?',
  image: 'https://via.placeholder.com/160x90',
  description:
    'This is a sample description for the writing card. And we need to make it very long but also short at the same time. This is a sample description for the writing card. And we need to make it very long but also short at the same time.',
  slug: 'sample-title',
  publishedDate: '2023-10-01',
};
export default function page() {
  return (
    <div className="p-10">
      <WritingCard {...mockData} />
    </div>
  );
}
