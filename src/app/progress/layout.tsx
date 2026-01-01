import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Progress",
  description:
    "Track your RecallDev mastery over time: accuracy, streaks, weakest topics, and most-missed questions.",
  alternates: {
    canonical: "/progress",
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

export default function ProgressLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}




