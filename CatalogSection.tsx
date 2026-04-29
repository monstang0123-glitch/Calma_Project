import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AlbumCard from '@/components/AlbumCard';
import CharacterReveal from '@/components/CharacterReveal';

gsap.registerPlugin(ScrollTrigger);

const ALBUMS = [
  {
    title: 'Midnight Guitar',
    genre: 'Guitar',
    description: 'Soft fingerpicked melodies that carry you into a peaceful night.',
    image: '/assets/album-1.jpg',
  },
  {
    title: 'Forest Rain',
    genre: 'Ambient',
    description: 'Gentle rain recorded in a remote forest canopy.',
    image: '/assets/album-2.jpg',
  },
  {
    title: 'Deep Rest',
    genre: 'Sleep',
    description: 'Slow, warm drones designed to guide you into deep sleep.',
    image: '/assets/album-3.jpg',
  },
  {
    title: 'Morning Light',
    genre: 'Piano',
    description: 'Gentle piano compositions for starting the day with clarity.',
    image: '/assets/album-4.jpg',
  },
  {
    title: 'Ocean Breeze',
    genre: 'Ambient',
    description: 'Coastal wind and wave recordings for instant calm.',
    image: '/assets/album-5.jpg',
  },
  {
    title: 'Gentle Hands',
    genre: 'Acoustic',
    description: 'Intimate acoustic guitar recordings in a candlelit studio.',
    image: '/assets/album-6.jpg',
  },
  {
    title: 'Stillness',
    genre: 'Meditation',
    description: 'Minimal tones for meditation and mindful breathing.',
    image: '/assets/album-7.jpg',
  },
  {
    title: 'Autumn Walk',
    genre: 'Nature',
    description: 'Crunching leaves and gentle wind through golden trees.',
    image: '/assets/album-8.jpg',
  },
  {
    title: 'Starlight',
    genre: 'Sleep',
    description: 'Ethereal, slow-moving soundscapes for stargazing and rest.',
    image: '/assets/album-9.jpg',
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function CatalogSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [albums, setAlbums] = useState(ALBUMS);
  const [isAnimating, setIsAnimating] = useState(false);
  const [gridKey, setGridKey] = useState(0);

  // Card staggered reveal on scroll
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll('.album-card');

    gsap.fromTo(
      cards,
      { clipPath: 'inset(0 0% 0 100%)', opacity: 0 },
      {
        clipPath: 'inset(0 0% 0 0%)',
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === grid) st.kill();
      });
    };
  }, [gridKey]);

  const handleLoadMore = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll('.album-card');

    // Animate cards out with 3D effect
    gsap.to(cards, {
      rotateY: 20,
      x: '100vw',
      opacity: 0,
      duration: 1.5,
      stagger: 0.05,
      ease: 'power3.in',
      onComplete: () => {
        setAlbums(shuffleArray(ALBUMS));
        setGridKey((prev) => prev + 1);
        setIsAnimating(false);
      },
    });
  }, [isAnimating]);

  return (
    <section ref={sectionRef} id="catalog" className="py-20 lg:py-40 px-6">
      <div className="max-w-[1140px] mx-auto">
        {/* Album Grid */}
        <div
          ref={gridRef}
          key={gridKey}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20"
        >
          {albums.map((album, i) => (
            <div key={`${album.title}-${i}`} className="album-card">
              <AlbumCard
                title={album.title}
                genre={album.genre}
                description={album.description}
                image={album.image}
              />
            </div>
          ))}
        </div>

        {/* Catalog Title + Load More */}
        <div className="text-center py-20">
          <CharacterReveal
            as="h2"
            className="font-serif text-[36px] lg:text-[64px] text-calm-black dark:text-calm-white leading-[1.3] mb-12"
          >
            Catalog
          </CharacterReveal>

          <button
            onClick={handleLoadMore}
            disabled={isAnimating}
            className="font-sans text-lg lg:text-2xl text-calm-black dark:text-calm-white font-light relative group disabled:opacity-50"
          >
            <span>Load More</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-calm-black dark:bg-calm-white transition-all duration-300 group-hover:w-full" />
          </button>
        </div>
      </div>
    </section>
  );
}
