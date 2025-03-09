import React from 'react';

export default function SlugPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <div>SlugPage</div>
      <h1>{params.slug}</h1>
    </>
  );
}
