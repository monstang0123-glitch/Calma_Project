import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CharacterRevealProps {
  children: string;
  className?: string;
  triggerMode?: 'load' | 'scroll';
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export default function CharacterReveal({
  children,
  className = '',
  triggerMode = 'scroll',
  delay = 0,
  as: Tag = 'h2',
}: CharacterRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll('.char');
    if (chars.length === 0) return;

    gsap.set(chars, { y: -50, opacity: 0 });

    const tl = gsap.timeline({
      delay,
      ...(triggerMode === 'scroll'
        ? {
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        : {}),
    });

    tl.to(chars, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.025,
      ease: 'power2.out',
    });

    return () => {
      tl.kill();
    };
  }, [children, triggerMode, delay]);

  const characters = children.split('').map((char, i) => (
    <span
      key={i}
      className="char inline-block"
      style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <div ref={containerRef}>
      <Tag className={className}>{characters}</Tag>
    </div>
  );
}
