import { Urbanist } from 'next/font/google';
import './globals.css';
import Providers from '@/components/site/Providers';
import ExportMode from '@/components/site/ExportMode';

// Urbanist is the brand's own typeface (named in the case study) and is open source, so it is loaded directly.
const urbanist = Urbanist({
  variable: '--font-urbanist',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
});

export const metadata = {
  title: { template: '%s · Tectra', default: 'Tectra' },
  description: 'Tectra brand system: logo, colour, type, motion, product and the physical brand.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${urbanist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
        <ExportMode />
      </body>
    </html>
  );
}
