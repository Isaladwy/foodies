import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs';

export interface Meal {
  id?: number;
  title: string;
  slug?: string;
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

  if (meal.image) {
    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;
    const filePath = `public/images/${fileName}`;

    const arrayBuffer = await meal.image.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(arrayBuffer));

    meal.image = `/images/${fileName}`;
  }

  db.prepare(
    `INSERT INTO meals (title, slug, image, summary, instructions, creator, creator_email)
    VALUES (@title, @slug, @image, @summary, @instructions, @creator, @creator_email)`
  ).run(meal);
}
