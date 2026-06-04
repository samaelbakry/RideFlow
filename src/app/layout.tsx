import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/providers/redux-provider";
import QueryProvider from "@/providers/query-provider";
import AuthProvider from "@/providers/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import MapsProvider from "@/providers/maps-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RideFlow",
  description:
    "A ride-sharing app built with Next.js, TypeScript, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{ fontFamily: "var(--font-geist-sans)" }}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased  font-sans`}
    >
      <body className="min-h-full flex flex-col">
        <ReduxProvider>
          <QueryProvider>
            <AuthProvider>
              <MapsProvider>
                {children}
              </MapsProvider>
              <Toaster position="top-right" />
            </AuthProvider>
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
