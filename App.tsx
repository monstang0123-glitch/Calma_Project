import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/hooks/useTheme';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';
import ShaderBackground from '@/components/ShaderBackground';
import GrainOverlay from '@/components/GrainOverlay';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';

export default function App() {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        <ShaderBackground />
        <GrainOverlay />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
