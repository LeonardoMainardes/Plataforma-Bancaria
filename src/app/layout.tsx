import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen font-[Inter]">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
