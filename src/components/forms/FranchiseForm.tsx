"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FranchisingFormSchema, type FranchisingFormInput } from '../../lib/formSchemas';
import { Button } from '../ui/Button';
import { t } from '../../lib/i18n-dict';
import type { Locale } from '../../lib/i18n';

export function FranchiseForm({ locale = 'tr' as Locale }) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [ok, setOk] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm<FranchisingFormInput>({
    resolver: zodResolver(FranchisingFormSchema)
  });
  const budgetValue = watch('budget') || '';
  const locationValue = watch('location') || '';

  function counterClass(current: number, max: number) {
    if (current > max) return 'text-red-600';
    if (current >= max - Math.ceil(max * 0.1)) return 'text-amber-600';
    return 'text-slate-500';
  }

  async function onSubmit(values: FranchisingFormInput) {
    setServerError(null);
    setOk(false);
    try {
      const res = await fetch('/api/forms/franchising', {
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
    } catch {
      setServerError('network_error');
    }
  }

  if (ok) {
    return (
      <div className="rounded border bg-white p-4 shadow-sm">
        <p className="text-green-700 text-sm">{t(locale, 'form.success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium">{locale === 'tr' ? 'Ad Soyad' : 'Full name'}</label>
          <input id="fullName" className="mt-1 w-full border rounded px-3 py-2" {...register('fullName')} />
          {errors.fullName && <p role="alert" className="mt-1 text-xs text-red-600">{t(locale, `form.errors.${errors.fullName.message}`, String(errors.fullName.message))}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">{t(locale, 'form.email')}</label>
          <input id="email" type="email" className="mt-1 w-full border rounded px-3 py-2" {...register('email')} />
          {errors.email && <p role="alert" className="mt-1 text-xs text-red-600">{t(locale, `form.errors.${errors.email.message}`, String(errors.email.message))}</p>}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">{t(locale, 'form.phone')}</label>
          <input id="phone" className="mt-1 w-full border rounded px-3 py-2" {...register('phone')} />
          {errors.phone && <p role="alert" className="mt-1 text-xs text-red-600">{t(locale, `form.errors.${errors.phone.message}`, String(errors.phone.message))}</p>}
        </div>
        <div>
          <label htmlFor="brand" className="block text-sm font-medium">{locale === 'tr' ? 'İlgilenilen Marka' : 'Interested Brand'}</label>
          <select id="brand" className="mt-1 w-full border rounded px-3 py-2" {...register('brand')}>
            <option value="">{locale === 'tr' ? 'Seçiniz' : 'Select'}</option>
            <option value="pidebypide">PidebyPide</option>
            <option value="baydoner">Baydöner</option>
            <option value="bursaishakbey">Bursa İshakbey</option>
          </select>
          {errors.brand && <p role="alert" className="mt-1 text-xs text-red-600">{t(locale, 'form.errors.required', 'Bu alan zorunludur.')}</p>}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="budget" className="block text-sm font-medium">{locale === 'tr' ? 'Yatırım Bütçesi' : 'Investment Budget'}</label>
          <input id="budget" className="mt-1 w-full border rounded px-3 py-2" maxLength={120} aria-describedby="budget-count" {...register('budget')} />
          <div className="mt-1 flex items-center justify-between">
            <p id="budget-count" className={`text-xs ${counterClass(budgetValue.length, 120)}`}>{budgetValue.length} / 120</p>
            {errors.budget && <p role="alert" className="text-xs text-red-600">{t(locale, `form.errors.${errors.budget.message}`, String(errors.budget.message))}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium">{locale === 'tr' ? 'Konum' : 'Location'}</label>
          <input id="location" className="mt-1 w-full border rounded px-3 py-2" maxLength={160} aria-describedby="location-count" {...register('location')} />
          <div className="mt-1 flex items-center justify-between">
            <p id="location-count" className={`text-xs ${counterClass(locationValue.length, 160)}`}>{locationValue.length} / 160</p>
            {errors.location && <p role="alert" className="text-xs text-red-600">{t(locale, `form.errors.${errors.location.message}`, String(errors.location.message))}</p>}
          </div>
        </div>
      </div>
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="hp">Do not fill</label>
        <input id="hp" type="text" tabIndex={-1} autoComplete="off" {...register('hp')} />
      </div>
      {serverError && <p role="alert" className="text-sm text-red-600">{t(locale, `form.errors.${serverError}`, serverError)}</p>}
      <div>
        <Button type="submit" loading={isSubmitting} variant="primary" elevation={2} pill>
          {isSubmitting ? t(locale, 'form.submitting') : t(locale, 'form.submit')}
        </Button>
      </div>
    </form>
  );
}
