import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://for-you-only-my-gf.vercel.app"),
  title: "For My Favorite Person 💌",
  description: "A digital universe built just for you. Happy National Girlfriend's Day.",
  openGraph: {
    title: "For My Favorite Person 💌",
    description: "A digital universe built just for you. Happy National Girlfriend's Day.",
    type: "website",
    url: "https://for-you-only-my-gf.vercel.app",
    siteName: "For You",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "A digital universe built just for you",
      },
    ],
  },
  // WhatsApp sometimes uses Twitter metadata as a backup if OpenGraph fails
  twitter: {
    card: "summary_large_image",
    title: "For My Favorite Person 💌",
    description: "A digital universe built just for you. Happy National Girlfriend's Day.",
    images: ["/opengraph-image.png"],
  },
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
