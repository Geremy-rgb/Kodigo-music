type Props = {
  id?: number;
  title: string;
  artist: string;
  image: string;
  isFavorite?: boolean;
  onFavorite?: () => void;
  className?: string;
};

export default function Card({
  title,
  artist,
  image,
  isFavorite,
  onFavorite,
  className
}: Props) {
  return (

    <div
      className={`relative ${className}`}
    >
      <img
        src={image}
        alt={title}
        className="w-40 h-40 object-cover rounded-full mb-2"
      />
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-gray-300">{artist}</p>
      <button
        onClick={onFavorite}
        className={`absolute top-2 right-2 text-xl w-[30px]  ${
          isFavorite ? "text-red-500" : "text-gray-400"
        }`}
      >
        ♥
      </button>
    </div>
  );
}
