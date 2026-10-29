"use client";

import React from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { UserProps } from "@/lib/types";

export default function DashboardNav() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user as UserProps | undefined;

  // Helper function to get initials from name (e.g., "Alex Rivera" -> "AR")
  const getInitials = (name?: string) => {
    if (!name) return "User"; // 
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  // Handle user sign out
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-100 bg-white/80 px-6 backdrop-blur-md">
      
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-200 transition group-hover:scale-105">
            <span className="text-xs font-bold tracking-wider">IG</span>
          </div>
          <span className="text-base font-extrabold text-gray-900 tracking-tight">
            Influencer <span className="text-indigo-600">Gear</span>
          </span>
        </Link>
      </div>

      {/* Right Side Actions (Profile & Sign Out) */}
      <div className="flex items-center gap-4">
        
        {/* User Profile Quick Badge */}
        <div className="hidden sm:flex items-center gap-2.5 rounded-full border border-gray-100 bg-gray-50/50 py-1.5 pl-2 pr-4 shadow-sm">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
            {getInitials(user?.name)} {/* 👈 Dynamic Initials */}
          </div>
          <span className="text-xs font-medium text-gray-700">
            {user?.name || "Loading..."}
          </span>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 hover:text-red-600 hover:border-red-100"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}