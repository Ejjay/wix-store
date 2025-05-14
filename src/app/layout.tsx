import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Poppins } from "next/font/google";
import Footer from "./Footer";
import "./globals.css";
import Navbar from "./Navbar";
import ReactQueryProvider from "./ReactQueryProvider"; 
// import BotAssistant from "@/components/BotAssistant";
import DisableContextMenu from "@/components/DisableContextMenu";
import Loading from "./loading";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],  
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ejstore21.vercel.app'),
  title: 'EJ Shop',
  description: 'Your one-stop shop for quality products',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ejstore21.vercel.app',
    siteName: 'EJ Shop',
    title: 'EJ Shop - Quality Products Online',
    description: 'Your one-stop shop for quality products at affordable prices',
    images: [
      {
        url: 'https://ejstore21.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EJ Shop Preview',
      },
      {
        url: '/ai-assistant',
        width: 1200,
        height: 630,
        alt: 'AI Shop Assistant',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }} suppressHydrationWarning>
      <head>
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover"
        />
        <link rel="manifest" href="/manifest.json" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `
          }}
        />
      </head>
      <body className={poppins.className} suppressHydrationWarning>
        <Loading />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange
          storageKey="ej-theme"
        >
          <ReactQueryProvider>
            <DisableContextMenu />
            <Navbar />
            <div className="min-h-[50vh]">{children}</div>
          {/*  <BotAssistant /> */}
            <Footer />
          </ReactQueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}