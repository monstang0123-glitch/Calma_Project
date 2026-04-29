import { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Sun, Moon, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Discover', href: '#artists' },
  { label: 'Catalog', href: '#catalog' },
  { label: 'Artists', href: '#artists' },
  { label: 'Stories', href: '#stories' },
  { label: 'About', href: '#faq' },
];

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          scrolled ? 'backdrop-blur-[20px] bg-white/60 dark:bg-black/60' : ''
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 max-w-[1400px] mx-auto">
          {/* Logo */}
          <a
            href="#"
            className="font-serif text-2xl text-calm-black dark:text-calm-white tracking-tight"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Calma
          </a>

          {/* Pill Nav - Desktop */}
          <div className="hidden lg:flex items-center bg-calm-forest rounded-[10px] px-2 py-2 gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-2 text-white font-sans text-sm font-light rounded-lg transition-colors duration-300 hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full transition-colors duration-300 hover:bg-calm-medium-gray/20"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Sun className="w-5 h-5 text-calm-black" />
              ) : (
                <Moon className="w-5 h-5 text-calm-white" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-full transition-colors duration-300 hover:bg-calm-medium-gray/20"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-6 h-6 text-calm-black dark:text-calm-white" />
              ) : (
                <Menu className="w-6 h-6 text-calm-black dark:text-calm-white" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[999] bg-calm-forest transition-all duration-500 lg:hidden ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-serif text-4xl text-white hover:text-calm-gold transition-colors duration-300"
              style={{
                transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms',
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.4s ease-out',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 w-12 h-12 rounded-full bg-calm-forest border border-white/20 flex items-center justify-center"
          aria-label="Close menu"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>
    </>
  );
}
