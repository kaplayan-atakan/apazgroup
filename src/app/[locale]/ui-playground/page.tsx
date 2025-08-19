"use client";
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { notFound } from 'next/navigation';

import { isLocale } from '../../../lib/i18n';
import { Button } from '../../../components/ui/Button';
import { Heading } from '../../../components/ui/Heading';
import { Container } from '../../../components/ui/Container';
import { Icon } from '../../../components/ui/Icon';
import { FadeInSection, StaggeredItem, StaggeredMotionGroup } from '../../../components/motion';
import { LoadingSpinner, LoadingOverlay } from '../../../components/ui/LoadingSpinner';
import { AccessibleCheckbox, AccessibleRadioGroup, NativeSelect } from '../../../components/accessibility';

export default function UIPlayground({ params }: { params: { locale: string } }) {
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [isChecked, setIsChecked] = useState(false);
  const [selectedValue, setSelectedValue] = useState('apple');
  
  // Trigger loading overlay for 2 seconds
  const handleShowLoading = () => {
    setShowLoadingOverlay(true);
    setTimeout(() => {
      setShowLoadingOverlay(false);
    }, 2000);
  };
  
  if (!isLocale(params.locale)) return notFound();
  return (
    <Container className="py-10 space-y-16">
      <Heading level={2}>UI Primitives</Heading>
      
      <div className="space-y-4">
        <Heading level={3}>New Color Palette</Heading>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center">
            <div className="w-full h-20 bg-brand-primary rounded-md mb-2"></div>
            <span className="text-sm">Primary</span>
            <code className="text-xs">#1F3A52</code>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full h-20 bg-brand-secondary rounded-md mb-2"></div>
            <span className="text-sm">Secondary</span>
            <code className="text-xs">#9B5A3C</code>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full h-20 bg-brand-accent rounded-md mb-2"></div>
            <span className="text-sm">Accent</span>
            <code className="text-xs">#C48A65</code>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full h-20 bg-brand-neutral-dark rounded-md mb-2"></div>
            <span className="text-sm">Neutral Dark</span>
            <code className="text-xs">#222222</code>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <Heading level={3}>Button Variants</Heading>
        <div className="flex flex-wrap gap-4 items-center">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>
      
      <div className="space-y-4">
        <Heading level={3}>Button Sizes</Heading>
        <div className="flex flex-wrap gap-4 items-center">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
      
      <div className="space-y-4">
        <Heading level={3}>Button Width & States</Heading>
        <div className="space-y-4">
          <Button fullWidth>Full Width Button</Button>
          <Button disabled>Disabled Button</Button>
        </div>
      </div>
      
      <FadeInSection className="space-y-4">
        <Heading level={3}>Motion Components</Heading>
        <p className="text-slate-700">
          Bu bölüm fade-in animasyonu ile görünür oluyor ve kullanıcının hareket tercihleri dikkate alınıyor.
        </p>
        
        <div className="flex flex-col gap-4 md:flex-row md:items-center my-8">
          <Button onClick={handleShowLoading}>
            Loading Overlay Göster (2 saniye)
          </Button>
          
          <div className="flex items-center gap-4">
            <LoadingSpinner size={24} />
            <span className="text-sm">Yükleniyor göstergesi</span>
          </div>
        </div>
      </FadeInSection>
      
      <FadeInSection className="space-y-4" direction="right" distance={40}>
        <Heading level={3}>Staggered Animation Grid</Heading>
        
        <StaggeredMotionGroup className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <StaggeredItem key={i} className="bg-slate-100 rounded-md shadow p-4">
              <div className="h-32 flex items-center justify-center">
                <span className="text-3xl text-slate-500">#{i+1}</span>
              </div>
            </StaggeredItem>
          ))}
        </StaggeredMotionGroup>
      </FadeInSection>
      
      <FadeInSection className="space-y-6">
        <Heading level={3}>Erişilebilir Form Bileşenleri</Heading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <AccessibleCheckbox
              id="accessibility-demo-checkbox"
              label="Bildirimler ve kampanyalar için iletişim izni veriyorum"
              description="Bu izni dilediğiniz zaman iptal edebilirsiniz"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            
            <AccessibleRadioGroup
              name="accessibility-demo-radio"
              label="Tercih ettiğiniz iletişim kanalı"
              options={[
                { value: 'option1', label: 'E-posta' },
                { value: 'option2', label: 'SMS', description: 'Standart mesajlaşma ücretleri geçerlidir' },
                { value: 'option3', label: 'Telefon', disabled: true },
              ]}
              value={radioValue}
              onChange={setRadioValue}
            />
          </div>
          
          <div>
            <NativeSelect
              id="accessibility-demo-select"
              label="Favori meyveniz"
              description="Menüden bir seçim yapın"
              options={[
                { value: 'apple', label: 'Elma' },
                { value: 'orange', label: 'Portakal' },
                { value: 'banana', label: 'Muz' },
                { value: 'strawberry', label: 'Çilek' }
              ]}
              value={selectedValue}
              onChange={setSelectedValue}
            />
          </div>
        </div>
      </FadeInSection>
      
      <div className="flex items-center gap-4 text-slate-600">
        <Icon name="arrow-up" />
        <Icon name="play" />
        <Icon name="mouse" />
      </div>
      
      {/* Loading Overlay with AnimatePresence for proper exit animations */}
      <AnimatePresence>
        {showLoadingOverlay && (
          <LoadingOverlay
            isLoading={true}
            srText="İçerik yükleniyor, lütfen bekleyin..."
          />
        )}
      </AnimatePresence>
    </Container>
  );
}
