import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Import context providers
import { UserProfileProvider } from "@/contexts/UserProfileContext";
import { ChatProvider } from "@/contexts/ChatContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Career Guide AI - Personalized Career Guidance",
  description: "Get personalized career guidance with AI-powered recommendations based on your interests, skills, and goals.",
  keywords: ["career guidance", "career advice", "AI career assistant", "job recommendations", "education pathways"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProfileProvider>
          <ChatProvider>
            {children}
          </ChatProvider>
        </UserProfileProvider>
      </body>
    </html>
  );
}
