import { getWorkouts } from "@/repositories/workoutRepository";

// Temporary until authentication is implemented.
const DEV_USER_ID = "cmsagifuk0000upu5lajy8s7a";

export default async function WorkoutsPage() {
  const workouts = await getWorkouts(DEV_USER_ID);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-semibold tracking-tight">My Workouts</h1>

      {workouts.length === 0 ? (
        <p className="mt-6 text-gray-600">
          You haven't created any workouts yet.
        </p>
      ) : (
        <ul className="mt-8 space-y-4">
          {workouts.map((workout) => (
            <li key={workout.id} className="rounded-lg border p-4 shadow-sm">
              <h2 className="text-lg font-medium">{workout.title}</h2>

              {workout.goal && (
                <p className="mt-2 text-sm text-gray-600">{workout.goal}</p>
              )}

              <p className="mt-3 text-sm text-gray-500">
                {workout._count.exercises} exercise
                {workout._count.exercises !== 1 ? "s" : ""}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
