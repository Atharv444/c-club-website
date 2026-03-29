import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { TransitionProvider } from "@/components/TransitionContext";
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "C://CLUB — C/C++ Programming Club",
  description:
    "A retro-futuristic terminal interface for the C/C++ Programming Club. Compile. Link. Execute.",
  keywords: ["C", "C++", "programming", "club", "coding", "terminal"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen font-mono" suppressHydrationWarning>
        <TransitionProvider>
          {children}
        </TransitionProvider>
      </body>
    </html>
  );
}
