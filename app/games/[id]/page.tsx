import db from "@/lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/header";

interface Game {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  min_players?: number;
  max_players?: number;
  play_time?: number;
}

export default async function GamePage({ params }: { params: { id: string } }) {
  const game = await getGame(params.id);

  if (!game) {
    return notFound();
  }

  async function getGame(id: string): Promise<Game | null> {
    try {
      const stmt = db.prepare('SELECT * FROM games WHERE id = ?');
      const game = stmt.get(id) as Game | undefined;
      
      if (!game) return null;
      
      return {
        ...game,
        price: parseFloat(game.price.toString())
      };
    } catch (error) {
      console.error('Database error:', error);
      return null;
    }
  }

  return (
    
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative h-150 rounded-lg overflow-hidden">
            <Image
              src={game.image_url}
              alt={game.name}
              fill
              className="object-cover"
              sizes="(max-width: 720px) 100vw, 50vw"
              priority
            />
          </div>
          
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">{game.name}</h1>
            <p className="text-blue-400 text-2xl font-bold mb-6">{game.price.toFixed(2)} ₽</p>
            
            <div className="flex gap-4 mb-6">
              {game.min_players && game.max_players && (
                <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                  {game.min_players}-{game.max_players} игроков
                </span>
              )}
              {game.play_time && (
                <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                  {game.play_time} мин
                </span>
              )}
              <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                {game.category}
              </span>
            </div>
            
            <p className="text-gray-300 mb-8">{game.description}</p>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}