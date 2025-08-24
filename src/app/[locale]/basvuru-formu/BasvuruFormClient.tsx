"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

import { BasvuruExtendedFormSchema, type BasvuruExtendedFormInput } from '../../../lib/formSchemas';

export default function BasvuruFormClient() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch, reset } = useForm<BasvuruExtendedFormInput>({ resolver: zodResolver(BasvuruExtendedFormSchema) });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileName = watch('userfileName');
  const onSubmit = async (values: BasvuruExtendedFormInput) => {
    const form = new FormData();
    Object.entries(values).forEach(([k,v])=>{ if(v!==undefined && v!==null) form.append(k,String(v)); });
    const fileInput = document.getElementById('userfile') as HTMLInputElement | null;
    if (fileInput?.files?.[0]) form.append('userfile', fileInput.files[0]);
    setStatus('idle');
    setErrorMsg(null);
    try {
      const res = await fetch('/api/forms/basvuru-extended',{ method:'POST', body: form });
      if (!res.ok) {
        let detail: unknown = null;
        try { detail = await res.json(); } catch (_e) {
          // ignore json parse error
        }
        setStatus('error');
  interface ErrorShape { errors?: { _global?: string } }
  const globalError = (detail && typeof detail === 'object' && 'errors' in detail ? (detail as ErrorShape).errors?._global : undefined);
  setErrorMsg(globalError || 'Gönderim sırasında bir hata oluştu.');
        return;
      }
      setStatus('success');
      reset();
      if (fileInput) fileInput.value = '';
    } catch (e) {
      setStatus('error');
      setErrorMsg('Sunucuya ulaşılamadı. Lütfen tekrar deneyin.');
    }
  };
  const dayOptions = Array.from({length:31},(_,i)=>String(i+1));
  const monthOptions = Array.from({length:12},(_,i)=>String(i+1));
  const yearOptions = Array.from({length:2004-1944+1},(_,i)=>String(1944+i));
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
      {status === 'success' && (
        <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          Başvurunuz başarıyla alındı. E-posta kutunuzu kontrol edebilirsiniz.
        </div>
      )}
      {status === 'error' && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMsg}
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="common_name_surname" className="block text-sm font-medium">Ad Soyad *</label>
          <input id="common_name_surname" className="mt-1 w-full border rounded px-3 py-2" {...register('common_name_surname')} />
          {errors.common_name_surname && <p className="text-xs text-red-600 mt-1">Zorunlu alan</p>}
        </div>
        <div>
          <label htmlFor="common_email" className="block text-sm font-medium">E-Posta *</label>
          <input id="common_email" type="email" className="mt-1 w-full border rounded px-3 py-2" {...register('common_email')} />
          {errors.common_email && <p className="text-xs text-red-600 mt-1">Geçerli e-posta giriniz</p>}
        </div>
      </div>
      <fieldset className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium" htmlFor="birth_day">Gün</label>
          <select id="birth_day" className="mt-1 w-full border rounded px-2 py-2" {...register('birth_day')}>
            <option value="">--</option>
            {dayOptions.map(d=> <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium" htmlFor="birth_month">Ay</label>
          <select id="birth_month" className="mt-1 w-full border rounded px-2 py-2" {...register('birth_month')}>
            <option value="">--</option>
            {monthOptions.map(m=> <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium" htmlFor="birth_year">Yıl</label>
          <select id="birth_year" className="mt-1 w-full border rounded px-2 py-2" {...register('birth_year')}>
            <option value="">--</option>
            {yearOptions.map(y=> <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </fieldset>
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="common_sex" className="block text-sm font-medium">Cinsiyet *</label>
          <select id="common_sex" className="mt-1 w-full border rounded px-2 py-2" {...register('common_sex')}>
            <option value="">Seçiniz</option>
            <option value="bay">Bay</option>
            <option value="bayan">Bayan</option>
          </select>
          {errors.common_sex && <p className="text-xs text-red-600 mt-1">Zorunlu</p>}
        </div>
        <div>
          <label htmlFor="common_maritalStatus" className="block text-sm font-medium">Medeni Durum *</label>
          <select id="common_maritalStatus" className="mt-1 w-full border rounded px-2 py-2" {...register('common_maritalStatus')}>
            <option value="">Seçiniz</option>
            <option value="evli">Evli</option>
            <option value="bekar">Bekar</option>
          </select>
          {errors.common_maritalStatus && <p className="text-xs text-red-600 mt-1">Zorunlu</p>}
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        <div>
          <label htmlFor="common_military" className="block text-sm font-medium">Askerlik Durumu *</label>
          <select id="common_military" className="mt-1 w-full border rounded px-2 py-2" {...register('common_military')}>
            <option value="">Seçiniz</option>
            <option value="yapildi">Yapıldı</option>
            <option value="tecilli">Tecilli</option>
            <option value="muaf">Muaf</option>
          </select>
          {errors.common_military && <p className="text-xs text-red-600 mt-1">Zorunlu</p>}
        </div>
        <div>
          <label htmlFor="common_licence" className="block text-sm font-medium">Ehliyet *</label>
          <select id="common_licence" className="mt-1 w-full border rounded px-2 py-2" {...register('common_licence')}>
            <option value="">Seçiniz</option>
            {['yok','a1','a2','b','c','d','e','f','g','h'].map(l=> <option key={l} value={l}>{l.toUpperCase()}</option>)}
          </select>
          {errors.common_licence && <p className="text-xs text-red-600 mt-1">Zorunlu</p>}
        </div>
        <div>
          <label htmlFor="userfile" className="block text-sm font-medium">CV Upload (PDF)</label>
          <input id="userfile" type="file" accept="application/pdf" className="mt-1 w-full border rounded px-2 py-2" onChange={e=>{
            const f=e.target.files?.[0];
            if(f){ setValue('userfileName', f.name); setValue('userfileType', f.type); setValue('userfileSize', f.size); }
            else { setValue('userfileName', undefined); setValue('userfileType', undefined); setValue('userfileSize', undefined); }
          }} />
          {fileName && <p className="text-xs text-slate-600 mt-1">{fileName}</p>}
        </div>
      </div>
      <div className="flex items-start gap-2">
        <input id="kisiselVerilerinKorunmasi" type="checkbox" className="mt-1" {...register('kisiselVerilerinKorunmasi')} />
        <label htmlFor="kisiselVerilerinKorunmasi" className="text-sm leading-snug">
          <Link href="/tr/kisisel-verilerin-korunmasi" target="_blank" className="underline">
            Kişisel Verilerin Korunması kanunu sözleşmesini okudum ve kabul ediyorum.
          </Link>
        </label>
      </div>
      {errors.kisiselVerilerinKorunmasi && <p className="text-xs text-red-600 -mt-2">Zorunlu</p>}
      <div className="flex items-start gap-2">
        <input id="cerezPolitikasi" type="checkbox" className="mt-1" {...register('cerezPolitikasi')} />
        <label htmlFor="cerezPolitikasi" className="text-sm leading-snug">
          <Link href="/tr/cerez-politikasi" target="_blank" className="underline">
            Çerez Politikası sözleşmesini okudum ve kabul ediyorum.
          </Link>
        </label>
      </div>
      {errors.cerezPolitikasi && <p className="text-xs text-red-600 -mt-2">Zorunlu</p>}
      <input type="hidden" {...register('iletisim_token')} value="" />
      <input type="text" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" {...register('hp')} />
      <div>
        <button type="submit" disabled={isSubmitting} className="bg-black text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-black/90 disabled:opacity-60">
          {isSubmitting ? 'Gönderiliyor…' : 'Gönder'}
        </button>
      </div>
    </form>
  );
}
