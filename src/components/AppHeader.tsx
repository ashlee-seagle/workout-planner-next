"use client";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

type AppHeaderProps = {
  userName?: string | null;
};

export default function AppHeader({ userName }: AppHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="border-b">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-semibold">
          Workout Planner
        </Link>
        <button
          type="button"
          className="md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          Menu
        </button>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-4 md:flex"
        >
          <Link href="/" className="text-sm font-medium">
            Home
          </Link>
          <Link href="/workouts" className="text-sm font-medium">
            Workouts
          </Link>
        </nav>

        {userName ? (
          <div className="hidden items-center gap-4 md:flex">
            <span className="text-sm">{userName}</span>

            <button
              type="button"
              onClick={() => signOut()}
              className="text-sm font-medium"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => signIn("google")}
            className="hidden text-sm font-medium md:block"
          >
            Sign In
          </button>
        )}
      </div>
      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="mx-auto flex w-full max-w-6xl flex-col gap-3 border-t px-4 py-4 md:hidden"
        >
          <Link
            href="/"
            className="text-sm font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/workouts"
            className="text-sm font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Workouts
          </Link>
          {userName ? (
            <div className="flex items-center gap-4">
              <span className="text-sm">{userName}</span>

              <button
                type="button"
                onClick={() => signOut()}
                className="text-sm font-medium"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => signIn("google")}
              className="text-sm font-medium"
            >
              Sign In
            </button>
          )}
        </nav>
      )}
    </header>
  );
}
