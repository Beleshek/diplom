"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/cart-context";

export function Providers({ 
  children,
  session 
}: { 
  children: React.ReactNode;
  session: any;
}) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        {children}
      </CartProvider>
    </SessionProvider>
  );
}