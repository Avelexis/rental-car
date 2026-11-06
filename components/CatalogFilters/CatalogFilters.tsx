'use client';

import { useEffect, useRef, type FormEvent } from 'react';
import styles from './CatalogFilters.module.css';
import type {
  CarFilterOptions,
  CatalogFilters as CatalogFiltersValues,
} from '../../lib/types';

type DropdownOption = {
  value: string;
  label: string;
};

const PRICE_MIN = 10;
const PRICE_MAX = 120;
const PRICE_STEP = 10;

type FilterDropdownProps = {
  label: string;
  placeholder: string;
  value: string;
  selectedLabel?: string;
  options: DropdownOption[];
  menuClassName: string;
  disabled: boolean;
  onChange: (value: string) => void;
};

function FilterDropdown({
  label,
  placeholder,
  value,
  selectedLabel,
  options,
  menuClassName,
  disabled,
  onChange,
}: FilterDropdownProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const optionLabel = options.find((option) => option.value === value)?.label;

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      const target = event.target;

      if (
        target instanceof Node &&
        detailsRef.current &&
        !detailsRef.current.contains(target)
      ) {
        detailsRef.current.open = false;
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' && detailsRef.current?.open) {
        detailsRef.current.open = false;
      }
    }

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  function selectOption(optionValue: string) {
    onChange(optionValue);

    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  }

  return (
    <details
      ref={detailsRef}
      className={styles.dropdown}
      onClick={(event) => {
        if (disabled) event.preventDefault();
      }}
    >
      <summary className={styles.dropdownControl} aria-label={label}>
        <span>{selectedLabel ?? optionLabel ?? placeholder}</span>
        <span className={styles.chevronWrap} aria-hidden="true">
          <svg className={styles.chevron} viewBox="0 0 13 7">
            <use href="/svg/car-details.svg#icon-chevron" />
          </svg>
        </span>
      </summary>

      <div
        className={`${styles.dropdownMenu} ${menuClassName}`}
        role="listbox"
        aria-label={label}
      >
        {options.map((option) => (
          <button
            key={option.value}
            className={styles.dropdownOption}
            type="button"
            role="option"
            aria-selected={option.value === value}
            onClick={() => selectOption(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </details>
  );
}

type CatalogFiltersProps = {
  value: CatalogFiltersValues;
  options: CarFilterOptions;
  disabled?: boolean;
  onChange: (name: keyof CatalogFiltersValues, value: string) => void;
  onSearch: () => void;
  onClear: () => void;
};

export default function CatalogFilters({
  value,
  options,
  disabled = false,
  onChange,
  onSearch,
  onClear,
}: CatalogFiltersProps) {
  const prices: number[] = [];

  for (let price = PRICE_MIN; price <= PRICE_MAX; price += PRICE_STEP) {
    prices.push(price);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <span className={styles.label}>Car brand</span>
        <FilterDropdown
          label="Car brand"
          placeholder="Choose a brand"
          value={value.brand}
          options={options.brands.map((brand) => ({
            value: brand,
            label: brand,
          }))}
          menuClassName={styles.brandMenu}
          disabled={disabled}
          onChange={(brand) => onChange('brand', brand)}
        />
      </div>

      <div className={styles.field}>
        <span className={styles.label}>Price / hour</span>
        <FilterDropdown
          label="Price per hour"
          placeholder="Choose a price"
          value={value.price}
          selectedLabel={value.price ? `To $${value.price}` : undefined}
          options={prices.map((price) => ({
            value: String(price),
            label: `$${price}`,
          }))}
          menuClassName={styles.priceMenu}
          disabled={disabled}
          onChange={(price) => onChange('price', price)}
        />
      </div>

      <fieldset className={styles.mileageField}>
        <legend className={styles.label}>Car mileage / km</legend>
        <div className={styles.mileageInputs}>
          <input
            className={styles.mileageInput}
            id="min-mileage"
            name="minMileage"
            type="number"
            min="0"
            step="1"
            placeholder="From"
            aria-label="Minimum mileage"
            value={value.minMileage}
            onChange={(event) => onChange('minMileage', event.target.value)}
            disabled={disabled}
          />
          <input
            className={styles.mileageInput}
            id="max-mileage"
            name="maxMileage"
            type="number"
            min="0"
            step="1"
            placeholder="To"
            aria-label="Maximum mileage"
            value={value.maxMileage}
            onChange={(event) => onChange('maxMileage', event.target.value)}
            disabled={disabled}
          />
        </div>
      </fieldset>

      <div className={styles.actions}>
        <button
          className={styles.searchButton}
          type="submit"
          disabled={disabled}
        >
          Search
        </button>
        <button
          className={styles.clearButton}
          type="button"
          onClick={onClear}
          disabled={disabled}
        >
          Clear filters
        </button>
      </div>
    </form>
  );
}
