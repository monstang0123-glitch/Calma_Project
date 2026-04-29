import HeroSection from '@/sections/HeroSection';
import ArtistsSection from '@/sections/ArtistsSection';
import CatalogSection from '@/sections/CatalogSection';
import FeaturesSection from '@/sections/FeaturesSection';
import FAQSection from '@/sections/FAQSection';
import StoriesSection from '@/sections/StoriesSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ArtistsSection />
      <CatalogSection />
      <FeaturesSection />
      <FAQSection />
      <StoriesSection />
    </main>
  );
}
