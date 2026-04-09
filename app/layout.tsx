import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Кошачий Pinterest",
  description: "Приложение для просмотра и сохранения любимых котиков"
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
