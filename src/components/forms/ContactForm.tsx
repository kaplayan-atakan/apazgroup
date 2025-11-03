"use client";

import { useForm } from 'react-hook-form';
import NextLink from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

import { IletisimFormSchema, type IletisimFormInput } from '../../lib/formSchemas';
import { Button } from '../ui/Button';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<IletisimFormInput>({ resolver: zodResolver(IletisimFormSchema) });

  const subjectValue = watch('subject') || '';
  const messageValue = watch('message') || '';

  function fieldError(key: keyof IletisimFormInput): string | null {
    const err = errors[key];
    if (!err) return null;
    switch (err.message) {
      case 'required': return 'Bu alan zorunludur.';
      case 'min_2': return 'En az 2 karakter girin.';
      case 'min_10': return 'En az 10 karakter girin.';
      case 'max_50': return 'En fazla 50 karakter girilebilir.';
      case 'max_500': return 'En fazla 500 karakter girilebilir.';
      case 'email_invalid': return 'Geçerli bir e-posta girin.';
      case 'phone_invalid': return 'Geçerli bir telefon girin.';
      case 'consent_required': return 'Bu onay gerekli.';
      default: return 'Geçersiz değer.';
    }
  }

  function counterClass(current: number, max: number) {
    if (current > max) return 'text-red-600';
    if (current >= max - Math.ceil(max * 0.1)) return 'text-amber-600';
    return 'text-gray-500';
  }

  const onSubmit = async (data: IletisimFormInput) => {
    setStatus('submitting');
    try {
      const res = await fetch('/api/forms/iletisim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error('submit_error');
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Honeypot */}
      <input type="text" {...register('hp')} className="hidden" aria-hidden="true" tabIndex={-1} />

      <div>
        <label className="block text-sm font-medium">Ad Soyad</label>
        <input
          {...register('fullName')}
          type="text"
          className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
          placeholder="Adınız Soyadınız"
        />
        {errors.fullName && <p className="text-sm text-red-600 mt-1">Lütfen adınızı girin.</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">E-posta</label>
          <input
            {...register('email')}
            type="email"
            className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            placeholder="ornek@mail.com"
          />
          {errors.email && <p className="text-sm text-red-600 mt-1">Geçerli bir e-posta girin.</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Telefon</label>
          <input
            {...register('phone')}
            type="tel"
            className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            placeholder="05xx xxx xx xx"
          />
          {errors.phone && <p className="text-sm text-red-600 mt-1">Geçerli bir telefon girin.</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Konu</label>
        <input
          {...register('subject')}
          type="text"
          maxLength={50}
          aria-invalid={!!errors.subject || subjectValue.length > 50}
          aria-describedby={`subject-count${errors.subject ? ' subject-error' : ''}`}
          className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-yellow ${subjectValue.length > 50 ? 'border-red-500' : ''}`}
          placeholder="Konu"
        />
        <div className="mt-1 flex items-center justify-between">
          <p id="subject-count" className={`text-xs ${counterClass(subjectValue.length, 50)}`}>{subjectValue.length} / 50</p>
          {errors.subject && <p id="subject-error" className="text-xs text-red-600">{fieldError('subject')}</p>}
          {!errors.subject && subjectValue.length > 50 && (
            <p className="text-xs text-red-600">En fazla 50 karakter.</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Mesaj</label>
        <textarea
          {...register('message')}
          rows={6}
          maxLength={500}
          aria-invalid={!!errors.message || messageValue.length > 500 || messageValue.length < 10 && messageValue.length>0}
          aria-describedby={`message-count${errors.message ? ' message-error' : ''}`}
          className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-yellow ${messageValue.length > 500 ? 'border-red-500' : ''}`}
          placeholder="Mesajınız"
        />
        <div className="mt-1 flex items-start justify-between gap-4">
          <p id="message-count" className={`text-xs ${counterClass(messageValue.length, 500)}`}>{messageValue.length} / 500</p>
          {errors.message && <p id="message-error" className="text-xs text-red-600">{fieldError('message')}</p>}
          {!errors.message && messageValue.length > 500 && (
            <p className="text-xs text-red-600">En fazla 500 karakter.</p>
          )}
        </div>
      </div>

      <fieldset className="space-y-3">
        <legend className="sr-only">Onaylar</legend>
        <div className="flex items-start gap-2">
          <input
            id="kvkk"
            type="checkbox"
            className="mt-1"
            {...register('kisiselVerilerinKorunmasi', { required: true })}
            aria-required="true"
          />
          <label htmlFor="kvkk" className="text-sm leading-snug">
            Kişisel verilerimin <NextLink href={{ pathname: '/pdf', query: { src: '/hr/Kişisel Verilerin Korunması Kanunu Uyarınca Kamuoyu Aydınlatma Metni .pdf' } }} className="underline" target="_blank" rel="noopener noreferrer">KVKK Aydınlatma Metni</NextLink> kapsamında işlenmesini kabul ediyorum.
          </label>
        </div>
        {errors.kisiselVerilerinKorunmasi && (
          <p className="-mt-2 text-xs text-red-600">Bu onay gerekli.</p>
        )}
        <div className="flex items-start gap-2">
          <input
            id="cerez"
            type="checkbox"
            className="mt-1"
            {...register('cerezPolitikasi', { required: true })}
            aria-required="true"
          />
          <label htmlFor="cerez" className="text-sm leading-snug">
            Çerez politikasını <NextLink href={{ pathname: '/pdf', query: { src: '/hr/Çerez Politikası.pdf' } }} className="underline" target="_blank" rel="noopener noreferrer">okudum ve kabul ediyorum.</NextLink>
          </label>
        </div>
        {errors.cerezPolitikasi && (
          <p className="-mt-2 text-xs text-red-600">Bu onay gerekli.</p>
        )}
      </fieldset>

      <div className="flex items-center gap-3">
        <Button type="submit" loading={status === 'submitting'} pill elevation={2}>
          {status === 'submitting' ? 'Gönderiliyor…' : 'Gönder'}
        </Button>
        {status === 'success' && <span className="text-green-700">Teşekkürler! Mesajınız alındı.</span>}
        {status === 'error' && <span className="text-red-700">Bir hata oluştu. Lütfen tekrar deneyin.</span>}
      </div>
    </form>
  );
}
