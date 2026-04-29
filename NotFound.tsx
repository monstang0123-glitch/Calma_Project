import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-[100dvh] flex flex-col items-center justify-center px-6 bg-calm-white dark:bg-calm-black">
      <div className="text-center">
        <h1 className="font-serif text-[120px] lg:text-[180px] text-calm-black dark:text-calm-white leading-none mb-4">
          404
        </h1>
        <p className="font-sans text-lg lg:text-xl text-calm-text-gray font-light mb-12">
          Page not found. Let&apos;s find your way back to calm.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-sans text-lg lg:text-2xl text-calm-black dark:text-calm-white font-light relative group"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Calma</span>
          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-calm-black dark:bg-calm-white transition-all duration-300 group-hover:w-full" />
        </Link>
      </div>
    </main>
  );
}
