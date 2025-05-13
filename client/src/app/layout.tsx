// src/app/layout.tsx
// src/app/layout.tsx
import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import { ClientProviders } from '../components/providers/ClientProviders';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
});

export const metadata = {
  title: 'Memory Lane: School Days',
  description: 'Your Memory, amplified - Preserve your school memories',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}