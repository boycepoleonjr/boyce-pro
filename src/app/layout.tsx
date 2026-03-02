import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google"; // Removed Geist font imports
import { AuthProvider } from "@/lib/auth";
// import { AuthProvider } from "@/lib/auth"; // Commented out AuthProvider import
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Boyce Poleon Jr. - Full Stack Developer",
  description: "Full-stack developer. Founder. Building AI-powered teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`antialiased bg-[#0a0a0a] text-white`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
