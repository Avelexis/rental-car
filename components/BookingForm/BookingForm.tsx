'use client';

import { useState, type FormEvent, type FocusEvent } from 'react';
import { createBookingRequest } from '../../lib/api';
import styles from './BookingForm.module.css';

type FieldName = 'name' | 'email' | 'comment';
type FieldErrors = Partial<Record<FieldName, string>>;

function validate(name: FieldName, value: string) {
  if (!value.trim()) {
    return name === 'name'
      ? 'Please enter your name.'
      : name === 'email'
        ? 'Please enter your email.'
        : 'Comment is required.';
  }
  if (name === 'name' && value.trim().length < 2)
    return 'Name must be at least 2 characters.';
  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    return 'Please enter a valid email.';
  return '';
}

function ErrorIcon() {
  return (
    <span className={styles.errorIconWrap} aria-hidden="true">
      <svg className={styles.errorIcon} viewBox="0 0 24 24">
        <use href="/svg/car-details.svg#icon-error" />
      </svg>
    </span>
  );
}

export default function BookingForm({ carId }: { carId: string }) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [success, setSuccess] = useState('');
  const [requestError, setRequestError] = useState('');
  const [pending, setPending] = useState(false);

  function validateField(
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: FieldName,
  ) {
    const message = validate(name, event.currentTarget.value);
    setErrors((current) => ({ ...current, [name]: message || undefined }));
  }

  function fieldClass(name: FieldName) {
    return errors[name]
      ? `${styles.field} ${styles.invalidField}`
      : styles.field;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess('');
    setRequestError('');
    const form = new FormData(event.currentTarget);
    const values = {
      name: String(form.get('name') ?? ''),
      email: String(form.get('email') ?? ''),
      comment: String(form.get('comment') ?? ''),
    };
    const nextErrors: FieldErrors = {};
    (Object.keys(values) as FieldName[]).forEach((name) => {
      const message = validate(name, values[name]);
      if (message) nextErrors[name] = message;
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setPending(true);
    try {
      const result = await createBookingRequest(carId, values);
      setSuccess(result.message || 'Booking request sent successfully.');
      event.currentTarget.reset();
      setErrors({});
    } catch {
      setRequestError('Could not send your request. Please try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <h2>Book your car now</h2>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <div className={styles.fields}>
        <div className={fieldClass('name')}>
        {errors.name && <label className={styles.errorLabel} htmlFor="booking-name">Name*</label>}
          <input
            id="booking-name"
            name="name"
            placeholder="Name*"
            onBlur={(event) => validateField(event, 'name')}
            onChange={() =>
              errors.name &&
              setErrors((current) => ({ ...current, name: undefined }))
            }
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'booking-name-error' : undefined}
          />
          {errors.name && (
            <>
              <ErrorIcon />
              <span className={styles.fieldError} id="booking-name-error">
                {errors.name}
              </span>
            </>
          )}
        </div>
        <div className={fieldClass('email')}>
        {errors.email && <label className={styles.errorLabel} htmlFor="booking-email">Email*</label>}
          <input
            id="booking-email"
            name="email"
            type="email"
            placeholder="Email*"
            onBlur={(event) => validateField(event, 'email')}
            onChange={() =>
              errors.email &&
              setErrors((current) => ({ ...current, email: undefined }))
            }
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'booking-email-error' : undefined}
          />
          {errors.email && (
            <>
              <ErrorIcon />
              <span className={styles.fieldError} id="booking-email-error">
                {errors.email}
              </span>
            </>
          )}
        </div>
        <div className={fieldClass('comment')}>
          <label className={styles.visuallyHidden} htmlFor="booking-comment">
            Comment
          </label>
          <textarea
            id="booking-comment"
            name="comment"
            placeholder="Comment"
            onBlur={(event) => validateField(event, 'comment')}
            onChange={() =>
              errors.comment &&
              setErrors((current) => ({ ...current, comment: undefined }))
            }
            aria-invalid={Boolean(errors.comment)}
            aria-describedby={
              errors.comment ? 'booking-comment-error' : undefined
            }
          />
          {errors.comment && (
            <>
              <ErrorIcon />
              <span className={styles.fieldError} id="booking-comment-error">
                {errors.comment}
              </span>
            </>
          )}
        </div>
      </div>

      {requestError && (
        <p className={styles.requestError} role="alert">
          {requestError}
        </p>
      )}
      {success && (
        <p className={styles.success} role="status">
          {success}
        </p>
      )}
      <button disabled={pending}>{pending ? 'Sending...' : 'Send'}</button>
    </form>
  );
}
