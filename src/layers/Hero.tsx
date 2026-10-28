import Link from "next/link";
import {
  FiArrowRight,
  FiCamera,
  FiMic,
  FiSun,
  FiVideo,
  FiStar,
  FiCheckCircle,
  FiTrendingUp,
} from "react-icons/fi";

const stats = [
  { value: "10K+", label: "Creators" },
  { value: "500+", label: "Gear Items" },
  { value: "4.9", label: "Avg. Rating" },
];

const gearCards = [
  { icon: FiCamera, name: "Mirrorless Cameras", tag: "Video & Photo" },
  { icon: FiMic, name: "Studio Microphones", tag: "Crystal Audio" },
  { icon: FiSun, name: "Pro Lighting", tag: "Perfect Glow" },
  { icon: FiVideo, name: "Gimbals & Rigs", tag: "Smooth Shots" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/60 via-white to-white min-h-screen">
      {/* Background blobs */}
      <div className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl" />
      <div className="pointer-events-none absolute top-20 -right-24 h-96 w-96 rounded-full bg-violet-300/30 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:py-28">
        {/* LEFT: Copy */}
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-1.5 text-xs font-semibold text-indigo-600 shadow-sm">
            <FiStar className="text-amber-400" />
            Trusted by creators worldwide
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Gear up your{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              content game
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg lg:mx-0">
            Discover, compare, and manage the best cameras, mics, lights, and
            accessories, all in one place. Build the perfect creator setup
            without the guesswork.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:from-indigo-700 hover:to-violet-700 active:scale-[0.99]"
            >
              Get Started Free
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Explore Dashboard
            </Link>
          </div>

          {/* Trust points */}
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-500 lg:justify-start">
            {["No credit card required", "Free to join", "Cancel anytime"].map(
              (item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <FiCheckCircle className="text-emerald-500" />
                  {item}
                </li>
              )
            )}
          </ul>

          {/* Stats */}
          <div className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-gray-100 pt-8 mx-auto lg:mx-0">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-0.5 text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Visual */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* Glow behind the card grid */}
          <div className="absolute inset-0 -z-10 scale-95 rounded-3xl bg-gradient-to-tr from-indigo-500/20 to-violet-500/20 blur-2xl" />

          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {gearCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.name}
                  className={`group rounded-2xl border border-gray-100 bg-white p-5 shadow-xl shadow-indigo-500/5 transition duration-300 hover:-translate-y-1 hover:shadow-indigo-500/15 ${
                    i % 2 === 1 ? "sm:translate-y-6" : ""
                  }`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-200 transition group-hover:scale-110">
                    <Icon className="text-xl" />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-gray-900">
                    {card.name}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">{card.tag}</p>
                </div>
              );
            })}
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 rounded-2xl border border-gray-100 bg-white px-5 py-3 shadow-xl shadow-indigo-500/10 sm:flex lg:left-4 lg:translate-x-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <FiTrendingUp />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">+32% engagement</p>
              <p className="text-[11px] text-gray-500">after upgrading gear</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}