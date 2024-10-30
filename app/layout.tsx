import HeaderAuth from "@/components/header-auth";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import Feedback from "@/components/feedback";
import { Toaster } from "@/components/ui/toaster";
import { Metadata, Viewport } from "next";
import { getURL } from "@/utils/helpers";
import { TooltipProvider } from "@/components/ui/tooltip";
import Script from "next/script";

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: "Kathrin's Books",
  description: "An online bookstore for rare and unique books, curated by Kathrin.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
        `}
      </Script>
      <body className="bg-background font-medium ">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={0}>
            <div className="flex flex-col justify-between min-h-[100dvh]">
              <Nav headerAuth={<HeaderAuth />} />

              <main className="w-full overflow-x-clip flex flex-1 flex-col justify-start mt-20 mb-10">
                <Feedback>{children}</Feedback>
              </main>

              <Footer />
            </div>

            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
