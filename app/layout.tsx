import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Al EmlaQ Travel - تسجيل بيانات العملاء",
  description: "نظام تسجيل بيانات عملاء شركة Al EmlaQ Travel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
