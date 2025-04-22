
import '../styles/globals.css'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/app/providers";
import { getServerSession } from 'next-auth';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Игровой Магазин",
  description: "Лучшие настольные игры",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}