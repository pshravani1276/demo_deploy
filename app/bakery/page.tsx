import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "The Bakery — Velvet & Void",
  description: "Explore our menu of anti-gravity desserts and artisanal chocolate cakes.",
};

export default function BakeryPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-24 font-inter">
      <div className="max-w-4xl mx-auto mt-20">
        <h1 className="font-playfair text-6xl md:text-8xl mb-12 text-shimmer">
          The Bakery
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <p className="text-xl text-zinc-400 leading-relaxed">
              At Velvet &amp; Void, we don&apos;t just bake; we manipulate physics. Our 
              underground laboratory in the heart of the city is where the 
              impossible becomes edible.
            </p>
            <p className="text-zinc-500">
              Each cake is suspended in a controlled magnetic field, ensuring 
              that every bite remains as light as air. Our chocolate is 
              sourced from the darkest corners of the world, tempered to 
              withstand the void.
            </p>
          </div>
          
          <div className="border border-zinc-800 p-8 rounded-2xl bg-zinc-900/30 backdrop-blur-sm">
            <h2 className="font-playfair text-2xl mb-4 text-rose-500">Daily Specials</h2>
            <ul className="space-y-4 text-zinc-300">
              <li className="flex justify-between border-b border-zinc-800 pb-2">
                <span>The Void Cocoa</span>
                <span className="text-zinc-500">$18</span>
              </li>
              <li className="flex justify-between border-b border-zinc-800 pb-2">
                <span>Anti-Gravity Truffle</span>
                <span className="text-zinc-500">$22</span>
              </li>
              <li className="flex justify-between border-b border-zinc-800 pb-2">
                <span>Velvet Singularity</span>
                <span className="text-zinc-500">$25</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20">
          <Link 
            href="/" 
            className="inline-flex items-center text-rose-500 hover:text-rose-400 transition-colors gap-2"
          >
            ← Back to the Experience
          </Link>
        </div>
      </div>
    </main>
  );
}
