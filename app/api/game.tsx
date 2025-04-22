import type { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/db';

interface Game {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const limit = parseInt(req.query.limit as string) || 8;
    const stmt = db.prepare('SELECT * FROM games ORDER BY created_at DESC LIMIT ?');
    const games = stmt.all();
    
    console.log('Fetched games:', games); // Логируем данные
    
    res.status(200).json({
      games: games.map(g => ({
        ...g,
        price: parseFloat(g.price.toString())
      }))
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Database error' 
    });
  }
}