import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact — Velvet & Void",
  description: "Get in touch for reservations or inquiries about our anti-gravity desserts.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-24 font-inter">
      <div className="max-w-4xl mx-auto mt-20">
        <h1 className="font-playfair text-6xl md:text-8xl mb-12 text-shimmer">
          Get in Touch
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div>
              <h2 className="text-xs uppercase tracking-[0.2em] text-rose-500 mb-4">Location</h2>
              <p className="text-zinc-400 text-lg">
                12 Void Alley, Industrial District<br />
                The Singularity, NV 89101
              </p>
            </div>
            
            <div>
              <h2 className="text-xs uppercase tracking-[0.2em] text-rose-500 mb-4">Reservations</h2>
              <p className="text-zinc-400 text-lg hover:text-white transition-colors">
                reservations@velvetandvoid.com
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xs uppercase tracking-[0.2em] text-rose-500 mb-4">Social</h2>
              <div className="flex gap-6 text-zinc-500 text-sm">
                <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
                <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
                <span className="hover:text-white cursor-pointer transition-colors">Vimeo</span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/40 p-10 rounded-3xl border border-zinc-800 backdrop-blur-md">
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs uppercase text-zinc-500">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b border-zinc-700 py-2 focus:border-rose-500 outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase text-zinc-500">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-transparent border-b border-zinc-700 py-2 focus:border-rose-500 outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase text-zinc-500">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-transparent border border-zinc-700 p-3 rounded-lg focus:border-rose-500 outline-none transition-colors"
                />
              </div>
              <button 
                type="button"
                className="w-full bg-white text-black py-4 rounded-full font-bold hover:bg-rose-500 hover:text-white transition-all uppercase text-xs tracking-widest"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
