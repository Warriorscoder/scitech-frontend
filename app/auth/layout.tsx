export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left: Form */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Right: Image */}
      <div className="hidden lg:flex items-center justify-center bg-linear-to-br from-purple-400 to-indigo-500 rounded-l-3xl">
        <img src="/auth.png" alt="Auth graphic" className="w-4/5 h-auto" />
      </div>
    </div>
  );
}
