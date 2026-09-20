import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-full bg-base-100 grid md:grid-cols-2 lg:grid-cols-[1.10fr_0.90fr]">

      {/* =====================================================
          LEFT SIDE
      ===================================================== */}
      <section className="relative hidden min-h-screen overflow-hidden md:block">

        {/* Background Image */}
        <img
          src="/login-image.png"
          alt="Kura Kanni"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark + Gradient Overlay */}
        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

        {/* Decorative Glow */}
        <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex min-h-screen flex-col justify-between p-10 xl:p-14">

          {/* ================= BRAND ================= */}
          <div>
            <div className="flex items-center gap-3">

              {/* Logo */}
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-md">
                <span className="text-lg font-bold text-indigo-500">
                  K
                </span>
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  Kura <span className="text-indigo-500">Kanni</span>
                </h1>

                <p className="text-xs text-white/60">
                  Connect. Chat. Share.
                </p>
              </div>

            </div>
          </div>

          {/* ================= HERO ================= */}
          <div className="max-w-lg">

            {/* Small Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />

              <span className="text-xs font-medium text-white/80">
                A place for meaningful conversations
              </span>
            </div>

            <h2 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white xl:text-6xl">
              Conversations
              <br />
              that bring people
              <br />
              <span className="text-white/60">
                closer.
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-7 text-white/65 xl:text-base">
              Connect with friends, share ideas, and enjoy meaningful
              conversations in a simple and modern chatting experience.
            </p>

          </div>

          {/* ================= FOOTER ================= */}
          <div className="flex items-center justify-between border-t border-white/10 pt-5">

            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Kura Kanni
            </p>

            <p className="text-xs text-white/40">
              Simple. Private. Connected.
            </p>

          </div>

        </div>
      </section>

      {/* =====================================================
          RIGHT SIDE
      ===================================================== */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-base-100 px-5 py-10 sm:px-8">

        {/* Subtle background decoration */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-indigo-500/5 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-purple-500/5 blur-3xl" />

        {/* Form Container */}
        <div className="relative z-10 w-full max-w-lg">
          <Outlet />
        </div>

      </section>

    </div>
  );
}