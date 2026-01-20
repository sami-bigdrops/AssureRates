import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import Script from "next/script";
import AssureTrackScript from "@/components/AssureTrackScript";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});



export const metadata: Metadata = {
  title: "AssureRates",
  description: "Compare auto, home, mortgage, and life insurance quotes from top US providers. Save money on insurance with free quotes in just 3 minutes. Trusted by American families nationwide.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${roboto.variable}`} suppressHydrationWarning>
        <Script
          src="https://www.assure-track.com/scripts/main.js"
          strategy="afterInteractive"
        />
        <AssureTrackScript />
        {children}
      </body>
    </html>
  );
}
