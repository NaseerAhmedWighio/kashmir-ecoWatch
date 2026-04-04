import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PremiumStickyHeader } from '@/components/sections/PremiumStickyHeader';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kashmir Environmental Intelligence Platform',
  description: 'A unified scientific platform for ecological systems, biodiversity, environmental monitoring, and conservation intelligence across Kashmir',
  keywords: [
    'Kashmir',
    'Environment',
    'Biodiversity',
    'Ecology',
    'Conservation',
    'Monitoring',
    'GIS',
    'Climate',
    'Wildlife',
    'Wetlands',
  ],
  authors: [{ name: 'Kashmir Environmental Intelligence Platform' }],
   icons : {
      icon : ['/kew_LOGO.png'],
    },
  openGraph: {
    title: 'Kashmir Environmental Intelligence Platform',
    description: 'A unified scientific platform for ecological systems, biodiversity, environmental monitoring, and conservation intelligence across Kashmir',
    type: 'website',
    images: ['/kew_LOGO.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <PremiumStickyHeader />
        {children}
      </body>
    </html>
  );
}
