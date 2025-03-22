import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs';

export interface Meal {
  id: number;
  title: string;
  slug: string;
  image: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}

const db = sql('meals.db');

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // throw new Error('Failed to fetch meals');
  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug: string): Meal | undefined {
  const meal = db
    .prepare('SELECT * FROM meals WHERE slug = ?')
    .get(slug) as Meal;
  return meal;
}

export async function saveMeal(meal: Meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const response = await fetch(meal.image);
  const bufferedImage = await response.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed!');
    }
  });

  meal.image = `public/images/${fileName}`;
}
