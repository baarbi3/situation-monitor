import type { Metadata } from "next";
import "./globals.css";
import { Press_Start_2P, Roboto_Mono } from 'next/font/google';

const press_start_2p = Press_Start_2P({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--display-family',
});

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--text-family',
});

export const metadata: Metadata = {
  title: "Blitzkrieg Monitor",
  description: "Situation Monitor for GeoPolitics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${press_start_2p.variable} ${roboto_mono.variable} dark antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
