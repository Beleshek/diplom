
import Image from "next/image";
import Link from "next/link";

interface GameCardProps {
  game: {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
    min_players?: number;
    max_players?: number;
    play_time?: number;
  };
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Link 
      href={`/games/${game.id}`}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all hover:transform hover:scale-105 duration-300 h-full flex flex-col"
    >
      <div className="relative h-48">
        <Image
          src={game.image_url.startsWith('/') ? game.image_url : `/images/${game.image_url}`}
          alt={game.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 flex-grow">
        <h3 className="text-xl font-semibold text-white hover:text-blue-400 transition-colors">
          {game.name}
        </h3>
        <p className="text-gray-400 text-sm mb-1">{game.category}</p>
        <p className="text-blue-400 font-bold mt-2">{game.price.toFixed(2)} ₽</p>
        {game.min_players && game.max_players && (
          <div className="mt-2 text-sm text-gray-400">
            <span>{game.min_players}-{game.max_players} игроков</span> • 
            <span> {game.play_time} мин</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          onClick={(e) => {
            e.preventDefault();
            // Здесь будет логика добавления в корзину
          }}
        >
          В корзину
        </button>
      </div>
    </Link>
  );
}