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
    formState: { errors }
  } = useForm<IletisimFormInput>({ resolver: zodResolver(IletisimFormSchema) });

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
          className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
          placeholder="Konu"
        />
        {errors.subject && <p className="text-sm text-red-600 mt-1">Konu gereklidir.</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Mesaj</label>
        <textarea
          {...register('message')}
          rows={6}
          className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
          placeholder="Mesajınız"
        />
        {errors.message && <p className="text-sm text-red-600 mt-1">Lütfen mesajınızı yazın.</p>}
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
            Kişisel verilerimin <NextLink href="/tr/kisisel-verilerin-korunmasi" className="underline" target="_blank" rel="noopener noreferrer">KVKK Aydınlatma Metni</NextLink> kapsamında işlenmesini kabul ediyorum.
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
            Çerez politikasını <NextLink href="/tr/cerez-politikasi" className="underline" target="_blank" rel="noopener noreferrer">okudum ve kabul ediyorum.</NextLink>
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
