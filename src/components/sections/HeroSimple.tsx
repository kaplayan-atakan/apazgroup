interface HeroSimpleProps {
  heading: string;
  intro?: string;
  id?: string;
}

export function HeroSimple({ heading, intro, id = 'hero' }: HeroSimpleProps) {
  return (
    <section 
      className="mb-10 text-center not-prose"
      id={id}
      aria-labelledby={`${id}-heading`}
    >
      <h1 
        id={`${id}-heading`} 
        className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900"
      >
        {heading}
      </h1>
      {intro && 
        <p 
          className="mt-4 text-slate-600 max-w-2xl mx-auto text-base md:text-lg" 
          id={`${id}-intro`}
        >
          {intro}
        </p>
      }
    </section>
  );
}
