import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Minifolio - Your Farcaster Portfolio Tracker",
  description: "Track your crypto portfolio on Base, share with friends on Farcaster",
  icons: {
    icon: "/minifolio-icon-256x256.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
