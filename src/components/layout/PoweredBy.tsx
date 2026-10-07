export function PoweredBy() {
  return (
    <div className="relative h-[50px] w-full overflow-hidden">
      {/* Parabolic top edge: a quadratic Bézier from edge to edge, peaking at the centre */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 1000 50"
      >
        <defs>
          <linearGradient id="powered-by-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1F2223" />
            <stop offset="100%" stopColor="#121416" />
          </linearGradient>
          <linearGradient id="powered-by-stroke" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#A87545" stopOpacity="0" />
            <stop offset="50%" stopColor="#A87545" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#A87545" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,50 L0,48 Q500,-48 1000,48 L1000,50 Z" fill="url(#powered-by-fill)" />
        <path
          d="M0,48 Q500,-48 1000,48"
          fill="none"
          stroke="url(#powered-by-stroke)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="relative flex h-full items-end justify-center pb-3">
        <a
          className="group relative inline-flex items-center gap-2 text-xs text-plaster/55 transition hover:text-plaster/80"
          href="https://nallgeeks.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-8 -inset-y-3 rounded-full bg-oak/25 blur-xl transition duration-600 group-hover:bg-oak/40"
          />
          <span className="relative tracking-[0.18em] uppercase">Powered by</span>
          <span className="relative font-brand text-sm font-bold tracking-tight text-oak transition group-hover:text-[#C8925E] hover:cursor-pointer">
            NallGeeks
          </span>
        </a>
      </div>
    </div>
  );
}
