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
      ('Монополия', "Монополия", безусловно, является одной из самых известных настольных игр. Вряд ли найдётся тот, кто не играл или хотя бы не слышал про эту классическую экономическую стратегию. И это немудрено, ведь самая первая версия игры увидела свет аж в 1935 году! С тех пор было продано более 250 миллионов экземпляров "Монополии", и это не считая различных клонов вроде "Кооператива" или "Менеджера".', 1999.99, '/images/monopoly.jpg', 'Стратегия', 2, 6, 60),
      ('Колонизаторы', 'Серия "Колонизаторы" – одна из самых известных, интересных и оригинальных семейных настольных игр в мире. Всемирную известность она получила ещё в далёком 1995 году, когда получила престижную премию Spiel des Jahres. С тех пор игра занимает своё место на домашних полках и в сердцах миллионов любителей настольных игр. Игра послужила прообразом известнейшей компьютерной игры Settlers и породила массу продолжений в настольном формате.', 1499.99, '/images/catan.jpg', 'Стратегия', 3, 4, 90),
      ('Мафия', 'Сегодня едва ли можно встретить человека, который ничего не слышал о такой психологической игре, как "Мафия". Она появилась ещё в далёком 1986 году, а её автором стал студент психологического факультета МГУ Дмитрий Давыдов. Это игра для большой компании человек, в которой участники случайным образом делятся на 2 группы: мирные жители и преступники. Один из игроков становится ведущим, который контролирует процесс игры. Он раздаёт участникам карточки, которые и определяют, кого на службу приняла мафия, а кто играет на стороне простых обывателей. ', 799.99, '/images/mafia.jpg', 'Партийная', 4, 12, 30),
      ('Imperial Knights: Knight Questoris', 'Воплощение чести, власти и богатства', 19990, '/images/knight.jpg', 'Warhammer 40000', 2, 4, 60),
      ('Замес: Комбинация монстров', 'Волки, кровососы, разъярённая толпа!', 1000, '/images/zames.jpg', 'Замес', 4, 12, 30),
      ('Замес', 'Пираты, ниндзя, динозавры, роботы, инопланетяне', 2000, '/images/zames1.jpg', 'Замес', 4, 12, 30),
      ('Astra Militarum Army Set: Death Korps of Krieg', 'Варгейм', 29990, '/images/ig1.jpg', 'Warhammer 40000', 2, 4, 60),
      ('Ork Big Mek', 'Мне нравится Биг Мек из компьютерной игры "Dawn of war", поэтому я создал модель, основанную на этом персонаже. масштаб 28 мм.
      Есть много отдельных деталей - для лучшего литья. Причем самые детализированные детали вы можете распечатать на качественном дорогом принтере, а другие - на более дешевом аппарате.', 2000, '/images/ork3D.jpg', '3D-Models', 2, 2, 60);
  `);

  console.log("Database created and initialized with sample data");
} else {
  console.log("Using existing database");
}

export default db;