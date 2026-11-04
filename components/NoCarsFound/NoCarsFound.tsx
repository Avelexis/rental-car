import Image from 'next/image';
import styles from './NoCarsFound.module.css';

type NoCarsFoundProps = {
  onReset: () => void;
};

export default function NoCarsFound({ onReset }: NoCarsFoundProps) {
  return (
    <div className={styles.emptyState} role="status">
      <Image
        className={styles.illustration}
        src="/images/notfound.webp"
        alt=""
        width={414}
        height={378}
      />

      <h2 className={styles.title}>No cars found</h2>
      <p className={styles.description}>
        We couldn’t find any cars that match your current filters. Try changing
        your search criteria or reset the filters.
      </p>

      <button className={styles.resetButton} type="button" onClick={onReset}>
        Reset filters
      </button>
    </div>
  );
}
