"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get session data from Better Auth cleanly
  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    setIsMenuOpen(false);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/login"),
      },
    });
  };

  // Helper for active link styles with subtle background pill effect
  const getLinkStyle = (path: string) =>
    pathname === path
      ? "text-indigo-600 font-semibold bg-indigo-50 px-4 py-2 rounded-lg transition"
      : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors";
  if
    (pathname.includes('dashboard')) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3.5">

        {/* LEFT: Logo with Icon Badge */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition">
            <span className="text-sm font-bold tracking-wider">IG</span>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-gray-900">
            Influencer<span className="text-indigo-600">Gear</span>
          </span>
        </Link>

        {/* MIDDLE: Desktop Navigation Routes */}
        <div className="hidden md:flex items-center space-x-2">
          <Link href="/" className={getLinkStyle("/")}>
            Home
          </Link>
          <Link href="/dashboard" className={getLinkStyle("/dashboard")}>
            Dashboard
          </Link>
        </div>

        {/* RIGHT: Desktop User Info / Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {session ? (
            <div className="flex items-center gap-3 bg-gray-50/80 border border-gray-200/60 rounded-full pl-4 pr-2 py-1.5 shadow-xs">
              <div className="flex flex-col text-right">
                <span className="text-xs font-semibold text-gray-900">
                  {session.user.name}
                </span>
                <span className="text-[10px] text-gray-500 truncate max-w-[130px]">
                  {session.user.email}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="rounded-full bg-white border border-gray-200 px-3.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100 transition shadow-xs"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2 text-sm font-medium text-white shadow-md shadow-indigo-200 hover:from-indigo-700 hover:to-violet-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* MOBILE: Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>

      {/* MOBILE: Dropdown Menu Drawer */}
      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-5 md:hidden flex flex-col space-y-3 shadow-xl">
          <Link
            href="/"
            className={getLinkStyle("/")}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className={getLinkStyle("/dashboard")}
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>

          <div className="border-t border-gray-100 pt-4 mt-2">
            {session ? (
              <div className="flex flex-col space-y-3">
                <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200/60">
                  <p className="text-xs font-semibold text-gray-900">
                    {session.user.name}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {session.user.email}
                  </p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full rounded-xl bg-gray-100 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link
                  href="/login"
                  className="block text-center rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="block text-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-2.5 text-sm font-medium text-white shadow-md hover:from-indigo-700 hover:to-violet-700 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}