import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Olympia",
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
        className={`min-h-screen w-full h-full bg-cover bg-center bg-no-repeat relative`}
        style={{
          backgroundImage: "url('/assets/image/image1.png')",
        }}
      >
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
