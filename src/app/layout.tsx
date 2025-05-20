import type { Metadata } from 'next';
import { Pacifico, Roboto } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { BackgroundEffects } from '@/components/background-effects';

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pacifico',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Anik's Eternal Echo",
  description: 'A heartfelt birthday celebration for Anik, from Rajdip.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${pacifico.variable} ${roboto.variable} font-sans antialiased bg-gradient-to-br from-peach-gradient-start via-lavender-gradient-mid to-sunset-gradient-end min-h-screen relative overflow-x-hidden`}
      >
        <BackgroundEffects />
        <main className="relative z-10">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
