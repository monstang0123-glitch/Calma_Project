import ContentMaskReveal from '@/components/ContentMaskReveal';
import { Headphones, Music, Smartphone } from 'lucide-react';

const GENRES = [
  {
    title: 'Peaceful',
    gradient: 'from-calm-sage via-calm-forest to-black',
    description: 'Soft acoustic sounds to quiet the mind.',
    images: ['/assets/album-1.jpg', '/assets/album-4.jpg', '/assets/album-6.jpg', '/assets/album-7.jpg'],
  },
  {
    title: 'Nature',
    gradient: 'from-[#534333] via-[#2E2118] to-black',
    description: 'Field recordings from forests, oceans, and meadows.',
    images: ['/assets/album-2.jpg', '/assets/album-5.jpg', '/assets/album-8.jpg', '/assets/album-9.jpg'],
  },
  {
    title: 'Healing',
    gradient: 'from-calm-gold via-[#554C41] to-black',
    description: 'Warm tones crafted for deep emotional restoration.',
    images: ['/assets/album-3.jpg', '/assets/album-6.jpg', '/assets/album-1.jpg', '/assets/album-7.jpg'],
  },
  {
    title: 'Urban',
    gradient: 'from-calm-medium-gray via-calm-muted-gray to-black',
    description: 'Soft city ambience — gentle rain on streets, distant thunder.',
    images: ['/assets/album-5.jpg', '/assets/album-9.jpg', '/assets/album-2.jpg', '/assets/album-8.jpg'],
  },
];

const FEATURES = [
  {
    icon: Headphones,
    title: 'Curated for Calm',
    description: 'Every track is handpicked and arranged to create a seamless journey from tension to relaxation. No sudden changes, no jarring transitions — just a gentle flow of sound.',
  },
  {
    icon: Music,
    title: 'Artist Stories',
    description: 'Meet the musicians and sound designers behind the music. Each artist brings a unique perspective to the art of calm — from classical composers to nature recordists.',
  },
  {
    icon: Smartphone,
    title: 'Anywhere, Anytime',
    description: 'Listen on your phone, tablet, or desktop. Calma syncs across all your devices, so your peaceful space is always within reach.',
  },
];

export default function FeaturesSection() {
  return (
    <ContentMaskReveal className="py-20 lg:py-40">
      {/* Genre Cards */}
      <div className="max-w-[1140px] mx-auto px-6 mb-20">
        <div className="space-y-6">
          {GENRES.map((genre) => (
            <div
              key={genre.title}
              className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${genre.gradient} p-8 lg:p-12`}
            >
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div>
                    <h3 className="font-serif text-2xl lg:text-[32px] text-white mb-2">
                      {genre.title}
                    </h3>
                    <span className="inline-block border border-white/30 rounded px-2 py-0.5 text-xs font-sans text-white/80 mb-4">
                      {genre.title}
                    </span>
                    <p className="font-sans text-base lg:text-lg text-white/80 font-light max-w-md">
                      {genre.description}
                    </p>
                  </div>

                  {/* Image carousel */}
                  <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
                    {genre.images.map((img, i) => (
                      <div
                        key={i}
                        className="flex-shrink-0 w-[180px] lg:w-[220px] aspect-square rounded-lg overflow-hidden snap-start"
                      >
                        <img
                          src={img}
                          alt={`${genre.title} ${i + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="#catalog"
                  className="inline-block mt-6 font-sans text-lg text-white font-light relative group"
                >
                  <span>Listen now</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Columns */}
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="text-center lg:text-left">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-calm-forest/10 mb-6">
                  <Icon className="w-8 h-8 text-calm-forest" />
                </div>
                <h3 className="font-serif text-2xl lg:text-[32px] text-calm-black dark:text-calm-white mb-4">
                  {feature.title}
                </h3>
                <p className="font-sans text-base lg:text-lg text-calm-black/70 dark:text-calm-white/70 font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </ContentMaskReveal>
  );
}
