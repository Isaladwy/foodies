'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from './meals';

export async function shareMeal(formData: FormData) {
  const image = formData.get('image');

  // Validate that image is a File object
  if (!image || !(image instanceof File) || image.size === 0) {
    throw new Error('Please provide a valid image');
  }

  const meal = {
    creator: formData.get('name'),
    creator_email: formData.get('email'),
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: image, // Now we're sure this is a valid File object
  };

  if (
    !meal.title ||
    !meal.creator ||
    !meal.creator_email ||
    !meal.creator_email.toString().includes('@') ||
    !meal.summary ||
    !meal.instructions ||
    !meal.image
  ) {
    throw new Error('Missing required fields');
  }

  try {
    await saveMeal(meal);
    redirect('/meals');
  } catch (error) {
    console.error('Error saving meal:', error);
    throw new Error('Failed to create the meal. Please try again later.');
  }
}
