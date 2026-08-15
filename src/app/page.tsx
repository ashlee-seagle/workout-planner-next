import { auth } from "@/auth";
import Link from "next/link";
import { getWorkouts } from "@/repositories/workoutRepository";
export default async function Home() {
  const session = await auth();
  if (!session?.user?.id) {
    return (
      <section className="space-y-6">
        <p className="text-sm font-medium uppercase tracking-wide">
          Personalized training
        </p>

        <h1 className="max-w-2xl text-4xl font-bold tracking-tight">
          Build workouts that fit your goals, equipment, and schedule.
        </h1>

        <p className="max-w-2xl text-lg">
          Generate a workout with AI, customize it, and save it for later.
        </p>
      </section>
    );
  }

  const workouts = await getWorkouts(session.user.id);
  const recentWorkouts = workouts.slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section>
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome back, {session.user.name}
        </h1>
        <p className="mt-2 text-gray-600">
          Keep building workouts that fit your goals.
        </p>
      </section>

      {workouts.length === 0 ? (
        <div className="mt-8">
          <p className="text-gray-600">You haven't created any workouts yet.</p>

          <Link
            href="/workouts/create"
            className="mt-6 inline-block rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
          >
            Create Your First Workout
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-8">
            <p className="text-5xl font-bold text-sky-600">{workouts.length}</p>
            <p className="mt-1 text-gray-500">
              workout{workouts.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/workouts"
              className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
            >
              View Workouts
            </Link>

            <Link
              href="/workouts/create"
              className="rounded-md border border-sky-600 px-4 py-2 text-sm font-medium text-sky-600 transition hover:bg-sky-50"
            >
              Create Workout
            </Link>
          </div>
        </>
      )}

      {recentWorkouts.length > 0 && (
        <section>
          <div>
            <h2 className="text-2xl font-semibold">Recent Workouts</h2>
            <p className="mt-1 text-sm text-gray-500">
              Your most recently created workouts
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {recentWorkouts.map((workout) => (
              <Link
                key={workout.id}
                href={`/workouts/${workout.id}`}
                className="block rounded-xl border p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{workout.title}</h3>

                    {workout.goal && (
                      <p className="mt-1 text-sm text-gray-600">
                        {workout.goal}
                      </p>
                    )}

                    <p className="mt-2 text-sm text-gray-500">
                      {workout._count.exercises} exercise
                      {workout._count.exercises !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <span className="text-xl text-gray-400">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
