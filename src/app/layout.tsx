import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";

export const metadata: Metadata = {
  title: "Workout Planner",
  description: "Create, save, and manage personalized workouts.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="border-b">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
              <span className="text-lg font-semibold">Workout Planner</span>

              <nav aria-label="Main navigation">
                <Link href="/" className="text-sm font-medium">
                  Home
                </Link>
              </nav>
              {session?.user ? (
                <div className="flex items-center gap-4">
                  {session.user.name && (
                    <span className="text-sm">{session.user.name}</span>
                  )}

                  <form
                    action={async () => {
                      "use server";
                      await signOut();
                    }}
                  >
                    <button type="submit" className="text-sm font-medium">
                      Sign Out
                    </button>
                  </form>
                </div>
              ) : (
                <form
                  action={async () => {
                    "use server";
                    await signIn("google");
                  }}
                >
                  <button type="submit" className="text-sm font-medium">
                    Sign In
                  </button>
                </form>
              )}
            </div>
          </header>

          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
            {children}
          </main>

          <footer className="border-t">
            <div className="mx-auto w-full max-w-6xl px-4 py-4 text-sm">
              Workout Planner
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
