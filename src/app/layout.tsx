import { InterviewProvider } from "@/context/InterviewContext";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "RecallDev - Intelligent Interview Mastery",
    template: "%s | RecallDev",
  },
  description:
    "Master technical interviews with active recall. Practice JavaScript, TypeScript, Go, Python, and System Architecture questions tailored for all seniority levels.",
  keywords: [
    "technical interview",
    "coding practice",
    "active recall",
    "spaced repetition",
    "senior developer",
    "javascript",
    "typescript",
    "golang",
    "python",
    "system design",
    "software engineering",
  ],
  authors: [{ name: "Mandy9943", url: "https://mandy9943.dev" }],
  creator: "Mandy9943",
  publisher: "Mandy9943",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://recalldev.mandy9943.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "RecallDev - Intelligent Interview Mastery",
    description:
      "Master technical interviews with active recall. Practice JavaScript, TypeScript, Go, Python, and System Architecture questions.",
    url: "https://recalldev.mandy9943.dev",
    siteName: "RecallDev",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RecallDev - Intelligent Interview Mastery",
    description:
      "Master technical interviews with active recall. Practice JavaScript, TypeScript, Go, Python, and System Architecture questions.",
    creator: "@mandy9943",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
