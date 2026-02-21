import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/lib/providers/query-provider';
import { ThemeProvider } from '@/lib/providers/theme-provider';
import { AuthProvider } from '@/lib/providers/auth-provider';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { GoogleAuthProvider } from '@/lib/providers/google-auth-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'TempleHubUSA - Connect with Hindu Temples Across America',
    template: '%s | TempleHubUSA',
  },
  description:
    'Discover Hindu temples, attend events, book pujas, volunteer, and connect with your temple community across the United States.',
  keywords: ['Hindu temples', 'USA', 'pujas', 'events', 'community', 'donations'],
  openGraph: {
    title: 'TempleHubUSA',
    description: 'Connect with Hindu Temples Across America',
    url: 'https://templehubusa.com',
    siteName: 'TempleHubUSA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider>
          <QueryProvider>
            <AuthProvider>
              <GoogleAuthProvider>
                <TooltipProvider>
                  {children}
                </TooltipProvider>
                <Toaster richColors position="top-right" />
              </GoogleAuthProvider>
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
