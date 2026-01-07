import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./Providers.jsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "secureUPI",
  description: "A modern and secure UPI dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 text-zinc-900`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

