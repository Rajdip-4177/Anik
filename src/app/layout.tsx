import type { Metadata } from 'next';
import { Dancing_Script, Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { BackgroundEffects } from '@/components/background-effects';
import { MusicPlayer } from '@/components/music-player';

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: '400', // Dancing Script typically only has 400 weight
  variable: '--font-dancing-script',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
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
        className={`${dancingScript.variable} ${poppins.variable} font-sans antialiased bg-gradient-to-br from-peach-gradient-start via-lavender-gradient-mid to-sunset-gradient-end min-h-screen relative overflow-x-hidden`}
      >
        <BackgroundEffects />
        <main className="relative z-10">{children}</main>
        <MusicPlayer />
        <Toaster />
      </body>
    </html>
  );
}
