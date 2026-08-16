import { auth } from "@/auth";
import Link from "next/link";
import WorkoutCard from "@/components/WorkoutCard";
import { getWorkouts } from "@/repositories/workoutRepository";

export default async function WorkoutsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const workouts = await getWorkouts(session.user.id);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">My Workouts</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage your saved workouts.
          </p>
        </div>

        {workouts.length > 0 && (
          <Link
            href="/workouts/create"
            className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
          >
            Create Workout
          </Link>
        )}
      </div>

      {workouts.length === 0 ? (
        <section className="mt-8 rounded-xl border p-8">
          <h2 className="text-xl font-semibold">No workouts yet</h2>

          <p className="mt-2 text-gray-600">
            Create your first workout to get started.
          </p>

          <Link
            href="/workouts/create"
            className="mt-6 inline-block rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
          >
            Create Your First Workout
          </Link>
        </section>
      ) : (
        <ul className="mt-8 space-y-4">
          {workouts.map((workout) => (
            <li key={workout.id}>
              <WorkoutCard
                id={workout.id}
                title={workout.title}
                goal={workout.goal}
                exerciseCount={workout._count.exercises}
                durationMinutes={workout.durationMinutes}
                experienceLevel={workout.experienceLevel}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
