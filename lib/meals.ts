import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

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

export function saveMeal(meal: Meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

}
