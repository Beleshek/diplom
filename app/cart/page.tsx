"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import Image from "next/image";
import  Header  from "@/components/header";

export default function CartPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { items, removeItem, clearCart } = useCart();

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Доступ запрещен</h2>
          <p className="mb-4">Для просмотра корзины необходимо авторизоваться</p>
          <button
            onClick={() => router.push("/api/loging/signin")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Войти
          </button>
        </div>
      </div>
    );
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-900 min-h-screen">
      <Header />
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Корзина</h1>
        
        {items.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-lg">Ваша корзина пуста</p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Вернуться к покупкам
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {items.map((item) => (
                  <div key={item.gameId} className="p-4 border-b flex">
                    <div className="relative w-24 h-24 mr-4">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">{item.price} ₽ × {item.quantity}</p>
                      <p className="font-bold">{item.price * item.quantity} ₽</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.gameId)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Удалить
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow h-fit">
              <h2 className="text-xl font-bold mb-4">Итого</h2>
              <div className="flex justify-between mb-2">
                <span>Товары ({items.reduce((sum, item) => sum + item.quantity, 0)})</span>
                <span>{total} ₽</span>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Всего</span>
                  <span>{total} ₽</span>
                </div>
              </div>
              <button
                onClick={() => {
                  // Здесь будет логика оформления заказа
                  alert("Заказ оформлен!");
                  clearCart();
                }}
                className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
              >
                Оформить заказ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}