import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
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
  const isMaintenanceMode = true;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${roboto.variable}`} suppressHydrationWarning>
        {isMaintenanceMode ? (
          <div className="min-h-screen w-full flex items-center justify-center px-6 text-center">
            <div>
              <h1 className="text-4xl font-bold">Under Maintenance</h1>
              <p className="mt-4 text-base opacity-80">
                We are currently performing scheduled maintenance. Please check back soon.
              </p>
            </div>
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
