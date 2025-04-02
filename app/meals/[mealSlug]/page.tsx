import Image from 'next/image';
import classes from './page.module.css';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: { mealSlug: string };
}) {
  const meal = getMeal(params.mealSlug);
  return {
    title: meal?.title,
    description: meal?.summary,
  };
}

export default function MealDetailsPage({
  params,
}: {
  params: { mealSlug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const meal = getMeal(params.mealSlug);
  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions
    .replace(/\r\n/g, '<br />')
    .replace(/\n/g, '<br />');
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image as string} fill alt={meal.title} />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator} </a>
            <span className={classes.summary}>{meal.summary}</span>
          </p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}
