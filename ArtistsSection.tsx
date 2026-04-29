import ContentMaskReveal from '@/components/ContentMaskReveal';
import CharacterReveal from '@/components/CharacterReveal';

const ARTIST_IMAGES = [
  '/assets/artist-1.jpg',
  '/assets/artist-2.jpg',
  '/assets/artist-3.jpg',
  '/assets/artist-4.jpg',
];

export default function ArtistsSection() {
  return (
    <ContentMaskReveal className="py-20 lg:py-40 px-6">
      <div className="max-w-[1140px] mx-auto">
        {/* Heading */}
        <div className="max-w-[35ch] mb-8">
          <CharacterReveal
            as="h2"
            className="font-serif text-[28px] lg:text-[48px] text-calm-black dark:text-calm-white leading-[1.3]"
          >
            What is Calma?
          </CharacterReveal>
        </div>

        {/* Description */}
        <div className="max-w-[35ch] mb-16">
          <CharacterReveal
            as="p"
            delay={0.2}
            className="font-serif text-[18px] lg:text-[24px] text-calm-black dark:text-calm-white leading-[1.4]"
          >
            Calma is your companion for deep rest and mindful listening. We curate acoustic soundscapes designed to soothe the mind
          </CharacterReveal>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {ARTIST_IMAGES.map((img, i) => (
            <div
              key={i}
              className="aspect-square overflow-hidden rounded-lg"
            >
              <img
                src={img}
                alt={`Artist ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>

        {/* See More Link */}
        <div className="flex justify-end">
          <a
            href="#catalog"
            className="font-sans text-lg lg:text-2xl text-calm-black dark:text-calm-white font-light relative group"
          >
            <span>See more</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-calm-black dark:bg-calm-white transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </div>
    </ContentMaskReveal>
  );
}
