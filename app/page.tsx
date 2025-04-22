import Header from "@/components/header";
import Image from "next/image";
import db from "@/lib/db";

interface Game {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  min_players?: number;
  max_players?: number;
  play_time?: number;
}

export default async function Home() {
  // Получаем данные напрямую в Server Component
  const games = await getGames();

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Популярные игры</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <div key={game.id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image 
                    src={game.image_url} 
                    alt={game.name} 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{game.name}</h3>
                  <p className="text-gray-600 mt-2">{game.price.toFixed(2)} ₽</p>
                  {game.min_players && game.max_players && (
                    <div className="mt-2 text-sm text-gray-500">
                      <span>{game.min_players}-{game.max_players} игроков</span> • 
                      <span> {game.play_time} мин</span>
                    </div>
                  )}
                  <button className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                    В корзину
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

async function getGames(): Promise<Game[]> {
  try {
    const stmt = db.prepare('SELECT * FROM games LIMIT 8');
    const games = stmt.all() as Game[];
    
    return games.map(g => ({
      ...g,
      price: parseFloat(g.price.toString())
    }));
  } catch (error) {
    console.error('Database error:', error);
    return [];
  }
}