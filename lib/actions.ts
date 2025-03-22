'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from './meals';

export async function shareMeal(formData: FormData) {
  const meal = {
    creator: formData.get('name'),
    creator_email: formData.get('email'),
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
  };

  if (
    !meal.title ||
    !meal.creator ||
    !meal.creator_email ||
    !meal.summary ||
    !meal.instructions ||
    !meal.image
  ) {
    throw new Error('Missing required fields');
  }

  await saveMeal({
    title: meal.title.toString(),
    creator: meal.creator.toString(),
    creator_email: meal.creator_email.toString(),
    summary: meal.summary.toString(),
    instructions: meal.instructions.toString(),
    image: meal.image as unknown as File,
  });
  redirect('/meals');
}
