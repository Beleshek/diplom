import Header from "@/components/header";
import {Search} from "@/components/search-bar";
import db from "@/lib/db";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const searchQuery = searchParams.query || "";
  const games = await searchGames(searchQuery);

  async function searchGames(query: string) {
    try {
      const stmt = db.prepare(`
        SELECT * FROM games 
        WHERE name LIKE ? OR description LIKE ?
        LIMIT 8
      `);
      return stmt.all(`%${query}%`, `%${query}%`);
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
            {/* Рендерим найденные игры */}
          </div>
        ) : (
          <p className="text-center text-gray-400">
            {searchQuery ? "Игры не найдены" : "Введите поисковый запрос"}
          </p>
        )}
      </div>
    </div>
  );
}