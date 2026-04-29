import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`absolute bottom-8 right-8 flex flex-col items-center gap-2 transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <span className="font-sans text-sm text-calm-black dark:text-calm-white font-light">
        scroll down
      </span>
      <ChevronDown className="w-6 h-6 text-calm-black dark:text-calm-white animate-bounce-down" />
    </div>
  );
}
