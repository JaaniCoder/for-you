import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// 💌 FEATURE 4: Custom Metadata for iMessage/WhatsApp link sharing
export const metadata: Metadata = {
  metadataBase: new URL("https://for-you-only-my-gf.vercel.app"),
  title: "For My Favorite Person 💌",
  description: "A digital universe built just for you. Happy National Girlfriend's Day.",
  openGraph: {
    title: "For My Favorite Person 💌",
    description: "A digital universe built just for you. Happy National Girlfriend's Day.",
    type: "website",
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
