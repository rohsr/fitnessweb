import type { Metadata } from 'next';
import { Instrument_Serif, Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import Nav from '@/components/Nav';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const inter = Inter({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ASCENDX® — Discipline builds what motivation cannot.',
  description:
    'Personalized workouts, structured diet plans, and real progress tracking — built for people who are serious about transforming their body and staying consistent.',
  openGraph: {
    title: 'ASCENDX® — Discipline builds what motivation cannot.',
    description: 'Premium fitness consulting platform for serious transformations.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${inter.variable}`}>
      <body>
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
