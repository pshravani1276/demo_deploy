import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Our Story — Velvet & Void",
  description: "Learn about the philosophy and history of our anti-gravity bakery.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-24 font-inter">
      <div className="max-w-4xl mx-auto mt-20">
        <h1 className="font-playfair text-6xl md:text-8xl mb-12 text-shimmer">
          Our Story
        </h1>
        
        <div className="space-y-12 text-xl text-zinc-400 leading-relaxed">
          <p>
            Velvet & Void was born from a simple question: <span className="text-white italic">&quot;What if gravity was optional?&quot;</span>
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-8 border-y border-zinc-800">
            <div>
              <h2 className="font-playfair text-2xl text-rose-500 mb-4">The Vision</h2>
              <p className="text-base text-zinc-500">
                Founded in 2024 by a team of pastry chefs and aerospace engineers, 
                we spent three years perfecting the &quot;Void Method&quot;—a way to 
                suspend chocolate molecules in a state of perpetual lift.
              </p>
            </div>
            <div>
              <h2 className="font-playfair text-2xl text-rose-500 mb-4">The Craft</h2>
              <p className="text-base text-zinc-500">
                Every cake is a 72-hour process. From the initial dark 
                chocolate infusion to the final magnetic calibration, 
                precision is our only metric for success.
              </p>
            </div>
          </div>

          <p className="text-zinc-500">
            We believe that dessert should be more than just taste; it should 
            be an escape from the laws of nature. Welcome to the void.
          </p>
        </div>

        <div className="mt-20">
          <Link 
            href="/bakery" 
            className="inline-flex items-center text-rose-500 hover:text-rose-400 transition-colors gap-2"
          >
            Explore the Menu →
          </Link>
        </div>
      </div>
    </main>
  );
}
