import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Olympia Simulation",
  description: "Hệ thống mô phỏng Đường lên đỉnh Olympia",
};

const myriadPro = localFont({
  src: "../../public/fonts/MYRIADPRO-BOLD1.otf",
  variable: "--font-myriad",
  weight: "700", 
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={myriadPro.variable}>
      <body
        className={`min-h-screen bg-cover bg-center bg-no-repeat bg-fixed relative`}
        style={{
          backgroundImage: "url('/assets/image/image1.png')",
        }}
      >
        <div className="min-h-screen bg-black/20">{children}</div>
      </body>
    </html>
  );
}
