"use client";

import { useEffect, useState } from "react";
import { Button } from "./Button";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hide, setHide] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll && current > 80) {
        setHide(true);
      } else {
        setHide(false);
      }

      setLastScroll(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScroll]);

  return (
    <header
      className={`sticky top-0 z-50
        bg-white/70 backdrop-blur-md
        border-b border-neutral-200
        shadow-lg
        transition-transform duration-300
        ${hide ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="max-w-5xl mx-auto px-4 md:px-0 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-wide">Xovem Blog</h1>

        <nav className="hidden md:flex space-x-8 font-medium text-md">
          <a href="/sobre" className="hover:text-red-800 transition">
            Sobre
          </a>
          <a href="/contato" className="hover:text-red-800 transition">
            Contato
          </a>
        </nav>

        <Button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1"
          aria-label="Abrir menu"
        >
          <span className="w-6 h-0.5 bg-black" />
          <span className="w-6 h-0.5 bg-black" />
          <span className="w-6 h-0.5 bg-black" />
        </Button>
      </div>

      {open && (
        <div className="md:hidden bg-white/90 backdrop-blur-md border-t border-neutral-200">
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
