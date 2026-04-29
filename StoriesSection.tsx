import { useState } from 'react';
import ContentMaskReveal from '@/components/ContentMaskReveal';
import CharacterReveal from '@/components/CharacterReveal';

export default function StoriesSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <ContentMaskReveal id="stories" className="py-20 lg:py-40">
      <div
        className="relative overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at center, #F6F4F3 0%, #EAE7E5 15%, #B0A28E 40%, #F6F4F3 85%)',
        }}
      >
        <div className="max-w-[600px] mx-auto px-6 py-20 lg:py-32 text-center">
          <CharacterReveal
            as="h2"
            className="font-serif text-[28px] lg:text-[48px] text-calm-black leading-[1.3] mb-6"
          >
            Join the Calma Community
          </CharacterReveal>

          <p className="font-serif text-[18px] lg:text-[24px] text-calm-black leading-[1.4] mb-10 max-w-[45ch] mx-auto">
            Subscribe to our newsletter for new releases, artist stories, and exclusive calm playlists delivered to your inbox.
          </p>

          {submitted ? (
            <div className="py-8">
              <p className="font-sans text-lg text-calm-forest font-light">
                Thank you for subscribing! Check your inbox soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full sm:w-auto sm:min-w-[300px] px-4 py-3 border border-calm-forest rounded-[10px] font-sans text-lg text-calm-black placeholder:text-calm-muted-gray font-light focus:outline-none focus:border-calm-olive transition-colors duration-300 bg-white/80"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-calm-forest text-white font-sans text-lg rounded-[10px] font-light hover:bg-calm-olive transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </ContentMaskReveal>
  );
}
