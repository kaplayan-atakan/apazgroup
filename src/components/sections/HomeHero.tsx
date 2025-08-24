import { VideoPlayer } from '../media/VideoPlayer';
import { Icon } from '../ui/Icon';

interface HomeHeroProps {
  videoSrc: string;
  poster?: string;
  heading: string;
  subheading?: string;
  email?: string;
}

export function HomeHero({ videoSrc, poster, heading, subheading, email }: HomeHeroProps) {
  return (
    <section className="relative h-[100svh]" aria-label="Hero">
      <div className="absolute inset-0">
        <VideoPlayer 
          src={videoSrc}
          poster={poster}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white font-brand text-4xl md:text-6xl font-bold leading-tight">
          {heading}
        </h1>
        {subheading && (
          <p className="mt-6 text-white/90 text-lg md:text-2xl max-w-3xl">
            {subheading}
          </p>
        )}
        <div className="mt-6 w-24 h-1 bg-brand-yellow" aria-hidden="true" />
      </div>

      {/* Email bottom-left */}
      {email && (
        <div className="absolute bottom-6 left-6">
          <a href={`mailto:${email}`} className="text-white hover:text-brand-yellow transition-colors underline-offset-4 hover:underline">
            {email}
          </a>
        </div>
      )}

      {/* Scroll hint bottom-center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#brands" aria-label="Aşağı kaydır" className="text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow">
          <Icon name="mouse" className="w-10 h-10" />
        </a>
      </div>
    </section>
  );
}
