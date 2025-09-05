import "./globals.css";
import FloatingHomeButton from '@/components/FloatingHomeButton';

export const metadata = {
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
        <FloatingHomeButton />
      </body>
    </html>
  );
}

