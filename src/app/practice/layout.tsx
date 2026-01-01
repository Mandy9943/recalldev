import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Practice",
  description:
    "Practice technical interview questions using active recall and spaced repetition. Filter by language, seniority, and topics.",
  alternates: {
    canonical: "/practice",
  },
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function PracticeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}




