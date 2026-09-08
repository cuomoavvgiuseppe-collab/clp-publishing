import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageViewTracker from '@/components/PageViewTracker';
import { COL } from '@/lib/col';

export const metadata: Metadata = {
  metadataBase: new URL('https://publishing.studiolegalecuomogiuseppe.it'),
  title: {
    default: 'CLP Cuomo Legal Publishing — Manuali giuridici pratici',
    template: '%s | CLP Cuomo Legal Publishing',
  },
  description:
    'Volumi pratici su previdenza, nuove tecnologie e diritto del lavoro, scritti da Avv. Giuseppe Cuomo, patrocinante in Cassazione. Disponibili su Amazon in cartaceo e eBook.',
  openGraph: {
    siteName: 'CLP Cuomo Legal Publishing',
    locale: 'it_IT',
  },
  verification: {
    google: 'xbEZOK4TrHysdeEz8hXZexsAJ_7p1roIHtsYFa-FkgQ',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'CLP Publishing',
  },
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body
        style={{ backgroundColor: COL.navy, color: COL.warm }}
        className="antialiased overflow-x-hidden"
      >
        <PageViewTracker />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
