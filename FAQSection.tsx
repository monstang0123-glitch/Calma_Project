import { useState } from 'react';
import FAQItem from '@/components/FAQItem';
import CharacterReveal from '@/components/CharacterReveal';

const FAQS = [
  {
    question: 'What is Calma?',
    answer: 'Calma is a digital wellness platform offering curated acoustic music and ambient soundscapes designed to promote relaxation, focus, and restful sleep.',
  },
  {
    question: 'How do I listen to the music?',
    answer: 'You can stream all our music directly from your web browser, or download our mobile app for iOS and Android. All tracks are available in high-quality audio.',
  },
  {
    question: 'Is there a subscription fee?',
    answer: 'Calma offers a free tier with access to a curated selection of tracks. For unlimited access to our full catalog, we offer a monthly or annual subscription.',
  },
  {
    question: 'Can I download tracks for offline listening?',
    answer: 'Yes, subscribers can download any track or playlist for offline listening through our mobile app.',
  },
  {
    question: 'What genres of music do you offer?',
    answer: 'Our catalog spans acoustic guitar, ambient nature recordings, gentle piano, meditation tones, sleep soundscapes, and soft urban ambience.',
  },
  {
    question: 'How can I become a contributing artist?',
    answer: 'We welcome submissions from independent musicians and sound designers. Please reach out through our contact page with a link to your work.',
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-20 lg:py-40 px-6">
      <div className="max-w-[1140px] mx-auto">
        <div className="text-center mb-16">
          <CharacterReveal
            as="h2"
            className="font-serif text-[28px] lg:text-[48px] text-calm-black dark:text-calm-white leading-[1.3]"
          >
            Frequently Asked Questions
          </CharacterReveal>
        </div>

        <div className="max-w-[800px] mx-auto">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={activeIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
