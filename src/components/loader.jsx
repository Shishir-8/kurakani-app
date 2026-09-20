const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-base-100">
      <div className="flex flex-col items-center">

        {/* Logo */}
        <div className="relative flex h-14 w-14 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-2xl bg-indigo-500/10" />

          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500 shadow-lg shadow-indigo-500/20">
            <span className="text-xl font-semibold text-white">
              K
            </span>
          </div>
        </div>

        {/* App Name */}
        <h2 className="mt-4 text-lg font-semibold tracking-tight text-base-content">
          Kura Kanni
        </h2>

        {/* Spinner */}
        <div className="mt-4 h-5 w-5 animate-spin rounded-full border-2 border-base-content/10 border-t-indigo-500" />

      </div>
    </div>
  );
};

export default Loader;