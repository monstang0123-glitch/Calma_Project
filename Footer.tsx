const FOOTER_COLUMNS = [
  {
    title: 'Discover',
    links: ['About Us', 'Catalog', 'Artists', 'Stories', 'FAQ', 'Contact'],
  },
  {
    title: 'Legal',
    links: ['Terms of Use', 'Privacy Policy'],
  },
  {
    title: 'Social',
    links: ['Instagram', 'TikTok', 'X (Twitter)', 'YouTube', 'LinkedIn'],
  },
  {
    title: 'App',
    links: ['Google Play', 'App Store (coming soon)'],
  },
];

export default function Footer() {
  return (
    <footer className="bg-calm-dark-green text-white">
      <div className="max-w-[1140px] mx-auto px-6 pt-20 pb-10">
        {/* Top section - 4 columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-serif text-lg mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/70 hover:text-white hover:underline transition-all duration-300 font-sans font-light"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-calm-text-gray/40 mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-serif text-2xl">Calma</span>
          <span className="text-sm text-calm-muted-gray font-sans font-light">
            &copy; 2026 Calma
          </span>
        </div>
      </div>
    </footer>
  );
}
