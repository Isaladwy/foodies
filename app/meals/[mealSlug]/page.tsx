import React from 'react';

export default function MealDetailsPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <div>Meal Details</div>
      <h1>{params.slug}</h1>
    </>
  );
}
