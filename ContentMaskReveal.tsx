import { useRef, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ContentMaskRevealProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function ContentMaskReveal({ children, className = '' }: ContentMaskRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Mobile: horizontal clip-path wipe
      gsap.set(content, { clipPath: 'inset(0 100% 0 0)' });

      gsap.to(content, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    } else {
      // Desktop: circular gradient mask
      gsap.set(content, {
        maskImage: 'radial-gradient(circle at center, black 0%, transparent 0%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 0%)',
        filter: 'blur(20px)',
      });

      gsap.to(content, {
        maskImage: 'radial-gradient(circle at center, black 100%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 100%, transparent 100%)',
        filter: 'blur(0px)',
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className={className}>
      <div ref={contentRef}>{children}</div>
    </section>
  );
}
