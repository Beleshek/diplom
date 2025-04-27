import  Header  from "@/components/header";
import Image from "next/image";
import db from "@/lib/db";
import { Search } from "@/components/search-bar";
import Link from 'next/link';
import { AddToCartButton } from "@/components/cart-button";

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


export default async function Home({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  const selectedCategory = (await searchParams)?.category || '';
  const games = await getGames(selectedCategory);
  const categories = await getCategories();


  async function getGames(category?: string): Promise<Game[]> {
    try {
      const query = category
        ? 'SELECT * FROM games WHERE category = ? LIMIT 10'
        : 'SELECT * FROM games LIMIT 10';

      const stmt = db.prepare(query);
      const games = category
        ? stmt.all(category)
        : stmt.all() as Game[];

      return games.map(g => ({
        ...g,
        price: parseFloat(g.price.toString())
      }));
    } catch (error) {
      console.error('Database error:', error);
      return [];
    }
  }

  async function getCategories(): Promise<string[]> {
    try {
      const stmt = db.prepare('SELECT DISTINCT category FROM games');
      const categories = stmt.all() as { category: string }[];
      return categories.map(c => c.category);
    } catch (error) {
      console.error('Database error:', error);
      return [];
    }
  }

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8 flex">
        {/* Боковая панель с жанрами */}
        <div className="w-64 pr-8 hidden lg:block">
          <div className="bg-gray-800 rounded-lg p-6 sticky top-4">
            <Search />
            <h3 className="text-xl font-bold mb-4 text-blue-400">Жанры</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className={`w-full text-left hover:text-blue-300 transition-colors ${!selectedCategory ? 'text-blue-400' : 'text-gray-300'}`}
                >
                  Все игры
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/?category=${encodeURIComponent(category)}`}
                    className={`w-full text-left hover:text-blue-300 transition-colors ${selectedCategory === category ? 'text-blue-400' : 'text-gray-300'}`}
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>


        {/* Основной контент */}
        <div className="flex-1">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-white">Игры и модели</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game) => (
                <Link href={`/games/${game.id}`} key={game.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow hover:transform hover:scale-105 duration-300">
                  <div className="relative h-48">
                    <Image
                      src={`${game.image_url}`}
                      alt={game.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 400px) 100vw, (max-width: 1000px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-white">{game.name}</h3>
                    <p className="text-gray-400 text-sm mb-1">{game.category}</p>
                    <p className="text-blue-400 font-bold mt-2">{game.price.toFixed(2)} ₽</p>
                    {game.min_players && game.max_players && (
                      <div className="mt-2 text-sm text-gray-400">
                        <span>{game.min_players}-{game.max_players} игроков</span> •
                        <span> {game.play_time} мин</span>
                      </div>
                    )}
                    <div className="p-4">
                      <AddToCartButton game={game} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

