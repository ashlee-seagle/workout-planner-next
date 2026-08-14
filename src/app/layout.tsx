import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";
import AppHeader from "@/components/AppHeader";

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
          <AppHeader userName={session?.user?.name} />

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
