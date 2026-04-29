interface AlbumCardProps {
  title: string;
  genre: string;
  description: string;
  image: string;
}

export default function AlbumCard({ title, genre, description, image }: AlbumCardProps) {
  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-[10px] mb-4">
        <img
          src={image}
          alt={title}
          className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <h3 className="font-serif text-[24px] lg:text-[32px] text-calm-black dark:text-calm-white mb-2 leading-tight">
        {title}
      </h3>
      <span className="inline-block border border-calm-medium-gray rounded px-2 py-0.5 text-xs font-sans text-calm-olive mb-3">
        {genre}
      </span>
      <p className="font-sans text-sm lg:text-lg text-calm-black dark:text-calm-white/80 font-light leading-relaxed mb-3 line-clamp-3">
        {description}
      </p>
      <a
        href="#"
        className="font-sans text-lg text-calm-black dark:text-calm-white font-light relative group/link"
      >
        <span>Listen now</span>
        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-calm-black dark:bg-calm-white transition-all duration-300 group-hover/link:w-full" />
      </a>
    </div>
  );
}
