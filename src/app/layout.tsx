import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { InterviewProvider } from "@/context/InterviewContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RecallDev - Senior JS Interview Practice",
  description: "Active recall tool for Senior JavaScript Developers",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300`}
      >
        <InterviewProvider>
          <main className="max-w-md md:max-w-4xl mx-auto min-h-screen bg-white dark:bg-gray-900 shadow-xl dark:shadow-black/50 flex flex-col relative transition-colors duration-300 border-x dark:border-gray-800">
            {children}
          </main>
        </InterviewProvider>
      </body>
    </html>
  );
}
