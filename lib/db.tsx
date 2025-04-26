import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.resolve(process.cwd(), 'database.db');


// Проверяем, существует ли файл БД
const dbExists = fs.existsSync(dbPath);

const db = new Database(dbPath);

if (!dbExists) {
  db.exec(`

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );



    CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      image_url VARCHAR(255),
      category VARCHAR(100),
      min_players INTEGER,
      max_players INTEGER,
      play_time INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    INSERT INTO games (name, description, price, image_url, category, min_players, max_players, play_time)
    VALUES 
      ('Монополия', 'Классическая настольная игра', 1999.99, '/images/monopoly.jpg', 'Стратегия', 2, 6, 60),
      ('Колонизаторы', 'Развивайте свои поселения', 1499.99, '/images/catan.jpg', 'Стратегия', 3, 4, 90),
      ('Мафия', 'Детективная психологическая игра', 799.99, '/images/mafia.jpg', 'Партийная', 4, 12, 30),
      ('Imperial Knights: Knight Questoris', 'Воплощение чести, власти и богатства', 19990, '/images/knight.jpg', 'Warhammer 40000', 2, 4, 60),
      ('Замес: Комбинация монстров', 'Волки, кровососы, разъярённая толпа!', 1000, '/images/zames.jpg', 'Замес', 4, 12, 30),
      ('Замес', 'Пираты, ниндзя, динозавры, роботы, инопланетяне', 2000, '/images/zames1.jpg', 'Замес', 4, 12, 30),
      ('Astra Militarum Army Set: Death Korps of Krieg', 'Варгейм', 29990, '/images/ig1.jpg', 'Warhammer 40000', 2, 4, 60);
  `);

  console.log("Database created and initialized with sample data");
} else {
  console.log("Using existing database");
}

export default db;