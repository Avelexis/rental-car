import Loader from '../../../components/Loader/Loader';
import styles from './loading.module.css';

export default function CarDetailsLoading() {
  return (
    <main className={styles.loading} aria-busy="true">
      <Loader
        title="Loading Details Car..."
        description="Please wait while we fetch the best car for you"
      />
    </main>
  );
}
