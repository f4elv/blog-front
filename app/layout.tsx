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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={jetBrainsMono.className}>
      <body className="bg-neutral-100">
        <Header />
        {children}
      </body>
    </html>
  );
}
