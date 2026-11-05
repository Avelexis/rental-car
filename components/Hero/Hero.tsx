import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Find your perfect rental car</h1>
        <p className={styles.subtitle}>
          Reliable and budget-friendly rentals for any journey
        </p>

        <Link className={styles.button} href="/catalog" prefetch={false}>
          View Catalog
        </Link>
      </div>
    </section>
  );
}
