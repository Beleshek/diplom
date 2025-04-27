"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
  gameId: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (game: {
    id: number;
    name: string;
    price: number;
    image_url: string;
  }) => void;
  removeItem: (gameId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

// Это загрузка из local.storege
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
    setIsLoaded(true);
  }, []);

  // Сохранение корзины 
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addItem = (game: {
    id: number;
    name: string;
    price: number;
    image_url: string;
  }) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.gameId === game.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.gameId === game.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prevItems,
        {
          gameId: game.id,
          name: game.name,
          price: game.price,
          imageUrl: game.image_url,
          quantity: 1,
        },
      ];
    });
  };

  const removeItem = (gameId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.gameId !== gameId));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}