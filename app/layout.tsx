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
  title: "Doogleh — that's a lie",
  description:
    "Doogleh (Assyrian): lies. The world's first and only certified BS detector. Paste what they told you. Receive the truth.",
  openGraph: {
    title: "Doogleh — that's a lie",
    description:
      "Paste what they told you. Receive the truth. Accuracy: 100%, allegedly.",
    siteName: "Doogleh.com",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="grain min-h-full flex flex-col">{children}</body>
    </html>
  );
}
