"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/cart-context";

export default function Header() {
  const { data: session, status } = useSession();
  const { items } = useCart();

  // количество товаров в корзине
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Shelkov's Showcase
        </Link>
        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-black hover:text-blue-500">
            Главная
          </Link>

          <Link href="/cart" className="relative text-black hover:text-blue-500">
            Корзина
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
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
              <Link href="/api/loging/signin" className="text-black hover:text-blue-500">
                Вход
              </Link>
              <Link
                href="/api/loging/signup"
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