'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link
          className={styles.logo}
          href="/"
          prefetch={false}
          aria-label="Rental Cars home"
        >
          <span className={styles.logoGraphic} aria-hidden="true">
            <svg width="102" height="16">
              <use href="/svg/RentalCarsIcon.svg#rental-cars-logo" />
            </svg>
          </span>
        </Link>

        <nav className={styles.navigation} aria-label="Main navigation">
          <Link
            className={pathname === '/' ? styles.active : undefined}
            href="/"
            prefetch={false}
            aria-current={pathname === '/' ? 'page' : undefined}
          >
            Home
          </Link>
          <Link
            className={
              pathname === '/catalog' ? styles.active : undefined
            }
            href="/catalog"
            prefetch={false}
            aria-current={pathname === '/catalog' ? 'page' : undefined}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
