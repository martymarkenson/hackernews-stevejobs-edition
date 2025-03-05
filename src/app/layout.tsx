import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Y Combinator Hacker News - Redesigned by Steve Jobs",
  description: "A minimalist redesign of Hacker News inspired by Steve Jobs' aesthetic, based on a conversation with Paul Graham.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
