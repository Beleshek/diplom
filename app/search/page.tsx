import Header from "@/components/header";
import { Search } from "@/components/search-bar";
import { GameCard } from "@/components/game-card";
import db from "@/lib/db";
import Link from 'next/link';

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

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const searchQuery = searchParams?.query || "";
  const games = await searchGames(searchQuery);

  async function searchGames(query: string): Promise<Game[]> {
    try {
      const stmt = db.prepare(`
        SELECT * FROM games 
        WHERE name LIKE ? OR description LIKE ? OR category LIKE ?
        LIMIT 8
      `);
      const results = stmt.all(`%${query}%`, `%${query}%`, `%${query}%`) as Game[];
      
      return results.map(game => ({
        ...game,
        price: parseFloat(game.price.toString())
      }));
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  }

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-8">
          <Search initialValue={searchQuery} />
        </div>
        
        {/* Результаты поиска */}
        {games.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : searchQuery ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">По запросу "{searchQuery}" игры не найдены</p>
            <Link 
              href="/" 
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Вернуться к популярным играм
            </Link>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Введите название игры, жанр или описание</p>
          </div>
        )}
      </div>
    </div>
  );
}