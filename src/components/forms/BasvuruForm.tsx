"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { BasvuruFormSchema, type BasvuruFormInput } from '../../lib/formSchemas';
import { t } from '../../lib/i18n-dict';

export function BasvuruForm({ locale = 'tr' }: { locale?: 'tr' | 'en' }) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [ok, setOk] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<BasvuruFormInput>({
    resolver: zodResolver(BasvuruFormSchema)
  });

  async function onSubmit(values: BasvuruFormInput) {
    setServerError(null);
  setOk(false);
    try {
      const res = await fetch('/api/forms/basvuru', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        setServerError(typeof data?.errors?._global === 'string' ? data.errors._global : 'submit_failed');
        return;
      }
      setOk(true);
  reset();
    } catch (e) {
      setServerError('network_error');
    }
  }

  if (ok) {
    return (
      <div className="not-prose rounded border bg-white p-4 shadow-sm max-w-xl">
        <p className="text-green-700 text-sm">{t(locale, 'form.success')}</p>
      </div>
    );
  }

  return (
  <form onSubmit={handleSubmit(onSubmit)} className="not-prose grid gap-4 max-w-xl" noValidate aria-describedby="form-help">
      <div>
  <label className="block text-sm font-medium" htmlFor="name">{t(locale, 'form.name')}</label>
        <input id="name" className="mt-1 w-full border rounded px-3 py-2" {...register('name')} />
  {errors.name && <p role="alert" className="mt-1 text-xs text-red-600">{t(locale, `form.errors.${errors.name.message}`, String(errors.name.message))}</p>}
      </div>
      <div>
  <label className="block text-sm font-medium" htmlFor="email">{t(locale, 'form.email')}</label>
        <input id="email" type="email" className="mt-1 w-full border rounded px-3 py-2" {...register('email')} />
  {errors.email && <p role="alert" className="mt-1 text-xs text-red-600">{t(locale, `form.errors.${errors.email.message}`, String(errors.email.message))}</p>}
      </div>
      <div>
  <label className="block text-sm font-medium" htmlFor="phone">{t(locale, 'form.phone')}</label>
        <input id="phone" className="mt-1 w-full border rounded px-3 py-2" {...register('phone')} />
  {errors.phone && <p role="alert" className="mt-1 text-xs text-red-600">{t(locale, `form.errors.${errors.phone.message}`, String(errors.phone.message))}</p>}
      </div>
      <div>
  <label className="block text-sm font-medium" htmlFor="position">{t(locale, 'form.position')}</label>
        <input id="position" className="mt-1 w-full border rounded px-3 py-2" {...register('position')} />
  {errors.position && <p role="alert" className="mt-1 text-xs text-red-600">{t(locale, `form.errors.${errors.position.message}`, String(errors.position.message))}</p>}
      </div>
      <div>
  <label className="block text-sm font-medium" htmlFor="message">{t(locale, 'form.message')}</label>
        <textarea id="message" rows={5} className="mt-1 w-full border rounded px-3 py-2" {...register('message')} />
  {errors.message && <p role="alert" className="mt-1 text-xs text-red-600">{t(locale, `form.errors.${errors.message.message}`, String(errors.message.message))}</p>}
      </div>

      {/* Honeypot field (hidden from users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="hp">Do not fill</label>
        <input id="hp" type="text" tabIndex={-1} autoComplete="off" {...register('hp')} />
      </div>

      <div className="flex items-start gap-2">
        <input id="consent" type="checkbox" className="mt-1" aria-required="true" {...register('consent', { required: true })} />
        <label htmlFor="consent" className="text-sm">
          {t(locale, 'form.consent')} (
          <Link href={`/${locale}/kisisel-verilerin-korunmasi`} className="underline">
            {locale === 'tr' ? 'KVKK' : 'KVKK'}
          </Link>
          )
        </label>
      </div>
      {errors.consent && <p role="alert" className="-mt-2 text-xs text-red-600">{t(locale, `form.errors.${errors.consent.message}`, String(errors.consent.message))}</p>}

  <div>
  <label className="block text-sm font-medium" htmlFor="cv">{t(locale, 'form.cv')}</label>
    <input id="cv" type="file" disabled aria-disabled="true" className="mt-1 w-full border rounded px-3 py-2 opacity-60" />
  <p id="form-help" className="mt-1 text-xs text-slate-500">{t(locale, 'form.cv_hint')}</p>
  </div>

  {serverError && <p role="alert" className="text-sm text-red-600">{t(locale, `form.errors.${serverError}`, serverError)}</p>}
  {ok && <p className="text-sm text-green-700">{t(locale, 'form.success')}</p>}

      <div>
        <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded bg-black text-white px-4 py-2 disabled:opacity-50">
          {isSubmitting ? t(locale, 'form.submitting') : t(locale, 'form.submit')}
        </button>
      </div>
    </form>
  );
}
