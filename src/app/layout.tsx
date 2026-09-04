import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body
        style={{ backgroundColor: COL.navy, color: COL.warm }}
        className="antialiased overflow-x-hidden"
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
