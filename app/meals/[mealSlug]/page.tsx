import Image from 'next/image';
import classes from './page.module.css';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';

export default function MealDetailsPage({
  params,
}: {
  params: { mealSlug: string };
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
          <Image src={meal.image} fill alt={meal.title} />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
            <p className={classes.summary}>{meal.summary}</p>
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
