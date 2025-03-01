import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from 'sonner'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Globetrotter Challenge",
  description: "Test your geography knowledge and become the ultimate Globetrotter!",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: "Globetrotter Challenge",
    description: "Test your geography knowledge and become the ultimate Globetrotter!",
    images: [{
      url: '/api/og',
      width: 1200,
      height: 630,
      alt: 'Globetrotter Challenge'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: "Globetrotter Challenge",
    description: "Test your geography knowledge and become the ultimate Globetrotter!",
    images: ['/api/og'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
