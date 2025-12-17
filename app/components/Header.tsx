"use client";

import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 
                       bg-white/70 backdrop-blur-md 
                       border-b border-neutral-200
                       shadow-lg"
    >
      <div className="max-w-5xl mx-auto p-6 flex items-center justify-between">
        {/* Title */}
        <h1 className="text-2xl font-bold tracking-wide">Xovem Blog</h1>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-8 font-medium text-md">
          <a href="/sobre" className="hover:text-red-800 transition">
            Sobre
          </a>
          <a href="/contato" className="hover:text-red-800 transition">
            Contato
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1"
          aria-label="Abrir menu"
        >
          <span className="w-6 h-0.5 bg-black" />
          <span className="w-6 h-0.5 bg-black" />
          <span className="w-6 h-0.5 bg-black" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden bg-white/90 backdrop-blur-md 
                        border-t border-neutral-200"
        >
          <nav className="flex flex-col px-6 py-4 space-y-4 text-sm font-medium">
            <a href="/sobre" onClick={() => setOpen(false)}>
              Sobre
            </a>
            <a href="/contato" onClick={() => setOpen(false)}>
              Contato
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
