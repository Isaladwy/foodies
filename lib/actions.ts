'use server'

import { saveMeal } from "./meals";


  export async function shareMeal(formData: FormData) {

    const meal = {
      creator: formData.get('name'),
      creator_email: formData.get('email'),
      title: formData.get('title'),
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      image: formData.get('image'),
    };

    await saveMeal(meal);
  }
