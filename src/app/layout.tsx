import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import TopBar from '@/components/top-bar';
import Provider from '@/components/provider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'BenGeeks Project Template',
  description: 'A Next JS template for future use with next-auth',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider>
          <TopBar />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
