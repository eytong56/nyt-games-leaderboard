import type { Metadata } from "next";
import { franklin } from "./ui/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "NYT Games Leaderboard",
  description: "Personal NYT Games Mini Leaderboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${franklin.className} antialiased`}>{children}</body>
    </html>
  );
}
