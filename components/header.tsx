"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Игровой Магазин
        </Link>
        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-black hover:text-blue-500">
            Главная
          </Link>
          <Link href="/products" className="text-black hover:text-blue-500">
            Игры
          </Link>
          {status === "authenticated" ? (
            <>
              <span className="text-gray-600">Привет, {session.user?.name}</span>
              <button
                onClick={() => signOut()}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link href="api/loging/signin" className=" text-black hover:text-blue-500">
                Вход
              </Link>
              <Link
                href="api/loging/signup"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Регистрация
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}