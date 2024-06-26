import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Web3Modal } from '../context/web3modal'
import Navbar from "@/components/Navbar";
import TrendingCoins from "@/components/TrendingCoins";
import Footer from "@/components/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DeFi-App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Web3Modal>
          {children}
        <Footer />
        </Web3Modal>
      </body>
    </html>
  );
}
