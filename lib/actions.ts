'use server';
import { redirect } from 'next/navigation';
import { saveMeal } from './meals';

function isInvalidText(text: string | null): boolean {
  return !text || text.trim() === '';
}

export async function shareMeal(prevState: { message?: string } | undefined, formData: FormData) {
  const meal = {
    creator: formData.get('name') as string,
    creator_email: formData.get('email') as string,
    title: formData.get('title') as string,
    summary: formData.get('summary') as string,
    instructions: formData.get('instructions') as string,
    image: formData.get('image') as File,
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !(meal.image instanceof File) ||
    meal.image.size === 0
  ) {
    return {
      message: 'Invalid input. Please fill all the fields and select an image.',
    };
  }

  await saveMeal(meal);
  redirect('/meals');
}
