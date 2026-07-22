import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Olympia Simulation",
  description: "Hệ thống mô phỏng Đường lên đỉnh Olympia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${inter.className} min-h-screen bg-cover bg-center bg-no-repeat bg-fixed relative`}
        style={{
          backgroundImage: "url('/assets/image/image1.png')",
        }}
      >
        <div className="min-h-screen bg-black/20">{children}</div>
      </body>
    </html>
  );
}
