import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CharacterReveal from '@/components/CharacterReveal';
import ScrollIndicator from '@/components/ScrollIndicator';

gsap.registerPlugin(ScrollTrigger);

const SLICE_COUNT = 12; // 12 horizontal strips for parallax effect

// Speed multipliers for parallax layers
const PARALLAX_SPEEDS = [
  0.25, 0.3, 0.35, 0.4, 0.45, 0.5,
  0.6, 0.7, 0.85, 1.0, 1.3, 1.8,
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const slicesRef = useRef<HTMLDivElement[]>([]);
  const shapesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Parallax for image slices
      slicesRef.current.forEach((slice, i) => {
        if (!slice) return;
        const speed = PARALLAX_SPEEDS[i] || 0.5;
        const direction = i < SLICE_COUNT / 2 ? -1 : 1;

        gsap.to(slice, {
          y: () => speed * 200 * direction,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

      // Parallax for background shapes
      shapesRef.current.forEach((shape, i) => {
        if (!shape) return;
        const speed = 0.2 + (i * 0.15);
        const direction = i % 2 === 0 ? -1 : 1;

        gsap.to(shape, {
          y: () => speed * 150 * direction,
          scale: 1 + (i * 0.05),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full overflow-hidden"
    >
      {/* Background decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Circle shapes */}
        <div
          ref={(el) => { if (el) shapesRef.current[0] = el; }}
          className="absolute w-[300px] h-[300px] rounded-full bg-calm-gold/20 -bottom-20 -left-20 blur-2xl"
        />
        <div
          ref={(el) => { if (el) shapesRef.current[1] = el; }}
          className="absolute w-[400px] h-[400px] rounded-full bg-calm-sage/15 top-1/4 -right-40 blur-3xl"
        />
        <div
          ref={(el) => { if (el) shapesRef.current[2] = el; }}
          className="absolute w-[250px] h-[250px] rounded-full bg-calm-olive/10 bottom-1/3 right-1/4 blur-2xl"
        />
        <div
          ref={(el) => { if (el) shapesRef.current[3] = el; }}
          className="absolute w-[350px] h-[350px] rounded-full bg-calm-medium-gray/10 top-10 left-1/3 blur-3xl"
        />
        <div
          ref={(el) => { if (el) shapesRef.current[4] = el; }}
          className="absolute w-[200px] h-[200px] rounded-full bg-calm-forest/10 bottom-20 right-20 blur-xl"
        />
        {/* Rectangular blocks */}
        <div
          ref={(el) => { if (el) shapesRef.current[5] = el; }}
          className="absolute w-[150px] h-[100px] rounded-[10%] bg-calm-gold/10 top-20 right-10 blur-xl"
        />
        <div
          ref={(el) => { if (el) shapesRef.current[6] = el; }}
          className="absolute w-[120px] h-[80px] rounded-[10%] bg-calm-dark-gray/8 bottom-40 left-10 blur-lg"
        />
      </div>

      {/* Hero image with parallax slices */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-[1600px]">
          {Array.from({ length: SLICE_COUNT }).map((_, i) => {
            const topPct = (i / SLICE_COUNT) * 100;
            const bottomPct = 100 - ((i + 1) / SLICE_COUNT) * 100;
            return (
              <div
                key={i}
                ref={(el) => { if (el) slicesRef.current[i] = el; }}
                className="absolute inset-x-0"
                style={{
                  top: 0,
                  bottom: 0,
                  clipPath: `inset(${topPct}% 0 ${bottomPct}% 0)`,
                }}
              >
                <img
                  src="/assets/hero-person.jpg"
                  alt="Person sleeping peacefully with headphones"
                  className="w-full h-full object-cover object-center"
                  style={{
                    objectPosition: 'center 30%',
                  }}
                />
              </div>
            );
          })}
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFDFD] via-transparent to-transparent dark:from-black" />
        </div>
      </div>

      {/* Hero text content */}
      <div className="relative z-10 flex flex-col justify-end min-h-[100dvh] px-6 lg:px-16 pb-20">
        <div className="max-w-[80%]">
          <CharacterReveal
            as="h1"
            triggerMode="load"
            delay={0.5}
            className="font-serif text-[48px] lg:text-[72px] text-calm-black dark:text-calm-white leading-[1.2]"
          >
            Welcome
          </CharacterReveal>
          <p
            className="font-sans text-lg lg:text-xl text-calm-dark-gray dark:text-calm-white/70 font-light mt-4 max-w-md opacity-0 animate-[fadeIn_1s_ease-out_1.5s_forwards]"
            style={{
              animation: 'fadeIn 1s ease-out 1.5s forwards',
            }}
          >
            Your space for acoustic calm and mindful listening
          </p>
        </div>

        <ScrollIndicator />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
