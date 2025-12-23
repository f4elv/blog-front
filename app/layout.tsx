import Header from "./components/Header";
import "./globals.css";
import { JetBrains_Mono } from "next/font/google";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrainsmono",
  display: "swap",
  weight: ["400", "700", "800"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={jetBrainsMono.className}>
      <body className="bg-neutral-100 h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
