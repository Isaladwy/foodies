'use client';
import React from 'react';
import { useFormState } from 'react-dom';

export default function MealsFormSubmit() {
  const { pending } = useFormState();
  return (
    <form>
      <button disabled={pending}>
        {pending ? 'Submitting' : 'Share Meal'}
      </button>
    </form>
  );
}
