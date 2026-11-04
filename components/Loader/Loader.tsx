import styles from './Loader.module.css';

type LoaderProps = {
  title?: string;
  description?: string;
};

export default function Loader({
  title = 'Loading cars...',
  description = 'Please wait while we fetch the best cars for you',
}: LoaderProps) {
  return (
    <div className={styles.overlay} role="status" aria-live="polite">
      <div className={styles.card}>
        <span className={styles.spinner} aria-hidden="true" />
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
