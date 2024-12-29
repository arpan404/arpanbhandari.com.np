import React from 'react';
export default async function page({ params }: { params: { uid: string } }) {
    
  return <div>{params.uid}</div>;
}
