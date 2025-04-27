"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";

export function AddToCartButton({ 
  game 
}: { 
  game: { 
    id: number; 
    name: string; 
    price: number; 
    image_url: string 
  } 
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const { addItem } = useCart();

  const handleClick = () => {
    if (!session) {
      router.push("/api/loging/signin");
      return;
    }
    addItem(game);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
    >
      В корзину
    </button>
  );
}