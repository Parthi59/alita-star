// app/layout.tsx
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { ReactNode } from 'react';

export const metadata = {
  title: 'ALITA STAR 🏬',
  description: 'ALITA STAR 🏬 – Your futuristic smart shopping destination',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <body>
        {children}
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}

