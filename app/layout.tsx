import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Developer Portofolio — Antares Raven Ardiansyah",
  description: "Portofolio developer: skill, pengalaman, dan kontak.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-panel-left">{children}</body>
    </html>
  );
}
