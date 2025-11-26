import "./globals.css";

export const metadata = {
  title: "Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-linear-to-r from-yellow-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto">{children}</div>
      </body>
    </html>
  );
}
