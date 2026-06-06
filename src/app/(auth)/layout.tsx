export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-linear-to-br from-black via-zinc-900 to-zinc-800 p-12 text-white">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold tracking-tight">RideFlow</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Smart transportation platform
          </p>
        </div>

        <div className="relative z-10 max-w-lg">
          <span className="inline-flex rounded-full border border-white/20 px-4 py-1 text-sm backdrop-blur">
            Fast • Safe • Reliable
          </span>

          <h2 className="mt-6 text-5xl font-bold leading-tight">
            Your next ride is only one tap away.
          </h2>

          <p className="mt-5 text-lg text-zinc-300">
            Book rides, track drivers in real-time, manage payments, and enjoy a
            seamless travel experience wherever you go.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <h3 className="text-2xl font-bold">10K+</h3>
            <p className="text-sm text-zinc-400">Active Riders</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <h3 className="text-2xl font-bold">500+</h3>
            <p className="text-sm text-zinc-400">Drivers</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <h3 className="text-2xl font-bold">4.9★</h3>
            <p className="text-sm text-zinc-400">User Rating</p>
          </div>
        </div>
      </div>

      <div className="flex items-center  justify-center bg-background p-6">
        <div className="w-full max-w-md rounded-3xl border-none p-8">
          {children}
        </div>
      </div>
    </main>
  );
}
