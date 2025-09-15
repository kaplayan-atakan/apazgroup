"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { BasvuruFormSchema, type BasvuruFormInput } from '../../lib/formSchemas';
import { Button } from '../ui/Button';
import { t } from '../../lib/i18n-dict';

export function BasvuruForm({ locale = 'tr' }: { locale?: 'tr' | 'en' }) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [ok, setOk] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue, watch } = useForm<BasvuruFormInput>({
    resolver: zodResolver(BasvuruFormSchema)
  });
  const cvFile = watch('cvName');
  const positionValue = watch('position') || '';
  const experienceValue = watch('experience') || '';
  const messageValue = watch('message') || '';

  function counterClass(current: number, max: number) {
    if (current > max) return 'text-red-600';
    if (current >= max - Math.ceil(max * 0.1)) return 'text-amber-600';
    return 'text-slate-500';
  }

  async function onSubmit(values: BasvuruFormInput) {
    setServerError(null);
    setOk(false);
    try {
      const form = new FormData();
      for (const [k, v] of Object.entries(values)) {
        if (v === undefined || v === null) continue;
        if (typeof v === 'boolean') form.append(k, v ? 'true' : 'false');
        else form.append(k, String(v));
      }
      const fileInput = (document.getElementById('cv') as HTMLInputElement | null);
      if (fileInput && fileInput.files && fileInput.files[0]) {
        form.append('cv', fileInput.files[0]);
      }
      const res = await fetch('/api/forms/basvuru', { method: 'POST', body: form });
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
      <fieldset className="grid md:grid-cols-2 gap-4">
      <div>
          <label className="block text-sm font-medium" htmlFor="name">{t(locale, 'form.name')}</label>
        <input id="name" className="mt-1 w-full border rounded px-3 py-2" {...register('name')} />
          {errors.name && <p role="alert" className="mt-1 text-xs text-red-600">{t(locale, `form.errors.${errors.name.message}`, String(errors.name.message))}</p>}
      </div>
      <div>
          <label className="block text-sm font-medium" htmlFor="surname">{locale === 'tr' ? 'Soyad' : 'Surname'}</label>
          <input id="surname" className="mt-1 w-full border rounded px-3 py-2" {...register('surname')} />
          {errors.surname && (
            <p role="alert" className="mt-1 text-xs text-red-600">
              {t(locale, `form.errors.${errors.surname.message}`, String(errors.surname.message))}
            </p>
          )}
      </div>
      </fieldset>
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
        <input
          id="position"
          className="mt-1 w-full border rounded px-3 py-2"
          maxLength={120}
          aria-describedby="position-count"
          {...register('position')}
        />
        <div className="mt-1 flex items-center justify-between">
          <p id="position-count" className={`text-xs ${counterClass(positionValue.length, 120)}`}>{positionValue.length} / 120</p>
          {errors.position && <p role="alert" className="text-xs text-red-600">{t(locale, `form.errors.${errors.position.message}`, String(errors.position.message))}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium" htmlFor="experience">{locale === 'tr' ? 'Deneyim' : 'Experience'}</label>
        <textarea
          id="experience"
          rows={3}
          className="mt-1 w-full border rounded px-3 py-2"
          maxLength={400}
          aria-describedby="experience-count"
          {...register('experience')}
        />
        <div className="mt-1 flex items-center justify-between">
          <p id="experience-count" className={`text-xs ${counterClass(experienceValue.length, 400)}`}>{experienceValue.length} / 400</p>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium" htmlFor="message">{t(locale, 'form.message')}</label>
        <textarea
          id="message"
          rows={5}
          className="mt-1 w-full border rounded px-3 py-2"
          maxLength={2000}
          aria-describedby="message-count"
          {...register('message')}
        />
        <div className="mt-1 flex items-start justify-between gap-4">
          <p id="message-count" className={`text-xs ${counterClass(messageValue.length, 2000)}`}>{messageValue.length} / 2000</p>
          {errors.message && <p role="alert" className="text-xs text-red-600">{t(locale, `form.errors.${errors.message.message}`, String(errors.message.message))}</p>}
        </div>
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
        <label className="block text-sm font-medium" htmlFor="cv">{locale === 'tr' ? 'Özgeçmiş (PDF/DOC/DOCX, max 5MB)' : 'Resume (PDF/DOC/DOCX, max 5MB)'}</label>
        <input
          id="cv"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="mt-1 w-full border rounded px-3 py-2"
          aria-describedby="form-help"
      onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) {
        setValue('cvName', f.name);
        setValue('cvType', f.type);
        setValue('cvSize', f.size);
            } else {
        setValue('cvName', undefined);
        setValue('cvType', undefined);
        setValue('cvSize', undefined);
            }
          }}
        />
        <p id="form-help" className="mt-1 text-xs text-slate-500">{locale === 'tr' ? 'Yalnızca PDF, DOC, DOCX. Maksimum 5MB.' : 'PDF, DOC, DOCX only. Max 5MB.'}</p>
        {cvFile && <p className="mt-1 text-xs text-slate-600">{cvFile}</p>}
      </div>

  {serverError && <p role="alert" className="text-sm text-red-600">{t(locale, `form.errors.${serverError}`, serverError)}</p>}
  {ok && <p className="text-sm text-green-700">{t(locale, 'form.success')}</p>}

      <div>
        <Button type="submit" loading={isSubmitting} elevation={2} pill>
          {isSubmitting ? t(locale, 'form.submitting') : t(locale, 'form.submit')}
        </Button>
      </div>
    </form>
  );
}
