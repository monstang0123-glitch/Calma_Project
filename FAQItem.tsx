import { useRef, useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import gsap from 'gsap';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  const answerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (answerRef.current) {
      setHeight(answerRef.current.scrollHeight);
    }
  }, [answer]);

  useEffect(() => {
    if (answerRef.current) {
      gsap.to(answerRef.current, {
        height: isOpen ? height : 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [isOpen, height]);

  return (
    <div className="border-b border-calm-medium-gray/40">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="font-serif text-lg lg:text-2xl text-calm-black dark:text-calm-white pr-4">
          {question}
        </span>
        <ChevronRight
          className={`w-6 h-6 text-calm-black dark:text-calm-white flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-90' : ''
          }`}
        />
      </button>
      <div
        ref={answerRef}
        className="overflow-hidden"
        style={{ height: 0 }}
      >
        <p className="font-sans text-base lg:text-lg text-calm-text-gray font-light leading-relaxed pb-6">
          {answer}
        </p>
      </div>
    </div>
  );
}
