import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Velvet & Void — The Floating Cake House",
  description:
    "An anti-gravity dessert experience where gravity is the only ingredient we left out. Discover the art of floating chocolate cakes in the void.",
  keywords: ["floating cake", "velvet void", "anti-gravity dessert", "artisan cake"],
  openGraph: {
    title: "Velvet & Void — The Floating Cake House",
    description: "An anti-gravity dessert experience unlike any other.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-black antialiased grain-overlay">
        <nav className="fixed top-0 left-0 right-0 z-[50] p-6 flex justify-between items-center backdrop-blur-sm bg-black/20 border-b border-white/5">
          <Link href="/" className="font-playfair text-xl text-shimmer tracking-widest">
            VELVET & VOID
          </Link>
          <div className="flex gap-8 font-inter text-xs uppercase tracking-widest text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">Experience</Link>
            <Link href="/bakery" className="hover:text-white transition-colors">The Bakery</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
