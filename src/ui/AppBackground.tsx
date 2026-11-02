export default function AppBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-violet-50 via-white to-indigo-50"
    >
      {/* Color glows */}
      <div className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-purple-300/40 blur-3xl" />
      <div className="absolute -right-24 top-24 h-[26rem] w-[26rem] rounded-full bg-pink-200/50 blur-3xl" />
      <div className="absolute -bottom-40 left-1/3 h-[30rem] w-[30rem] rounded-full bg-indigo-300/30 blur-3xl" />

      {/* Dot grid that fades toward the edges */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: 'radial-gradient(#c4b5fd 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />
    </div>
  )
}