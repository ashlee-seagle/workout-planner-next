import Link from "next/link";
import { getWorkout } from "@/repositories/workoutRepository";
import { createExerciseAction } from "@/actions/workoutActions";
import { notFound } from "next/navigation";

// Temporary until authentication is implemented.
const DEV_USER_ID = "cmsagifuk0000upu5lajy8s7a";

export default async function WorkoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await getWorkout(id, DEV_USER_ID);

  if (!workout) {
    notFound();
  }
  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/workouts"
        className="text-sm font-medium text-gray-600 hover:text-black"
      >
        ← Back to workouts
      </Link>

      <div className="mt-6">
        <h1 className="text-3xl font-semibold tracking-tight">
          {workout.title}
        </h1>

        <div className="mt-6 space-y-4 rounded-lg border p-6">
          {workout.goal && (
            <div>
              <h2 className="text-sm font-medium text-gray-500">Goal</h2>
              <p className="mt-1">{workout.goal}</p>
            </div>
          )}

          {workout.durationMinutes && (
            <div>
              <h2 className="text-sm font-medium text-gray-500">Duration</h2>
              <p className="mt-1">{workout.durationMinutes} minutes</p>
            </div>
          )}

          {workout.experienceLevel && (
            <div>
              <h2 className="text-sm font-medium text-gray-500">
                Experience level
              </h2>
              <p className="mt-1">{workout.experienceLevel.toLowerCase()}</p>
            </div>
          )}

          {workout.equipment && (
            <div>
              <h2 className="text-sm font-medium text-gray-500">Equipment</h2>
              <p className="mt-1">{workout.equipment}</p>
            </div>
          )}

          {workout.notes && (
            <div>
              <h2 className="text-sm font-medium text-gray-500">Notes</h2>
              <p className="mt-1 whitespace-pre-line">{workout.notes}</p>
            </div>
          )}
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Exercises</h2>

        {workout.exercises.length === 0 ? (
          <p className="mt-4 text-gray-600">
            No exercises have been added yet.
          </p>
        ) : (
          <ol className="mt-6 space-y-4">
            {workout.exercises.map((exercise) => (
              <li key={exercise.id} className="rounded-lg border p-4">
                <h3 className="font-medium">{exercise.name}</h3>

                <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600">
                  {exercise.sets && <span>{exercise.sets} sets</span>}
                  {exercise.reps && <span>{exercise.reps} reps</span>}
                  {exercise.weight && (
                    <span>{exercise.weight.toString()} lb</span>
                  )}
                  {exercise.restSeconds && (
                    <span>{exercise.restSeconds} sec rest</span>
                  )}
                </div>

                {exercise.notes && (
                  <p className="mt-3 text-sm">{exercise.notes}</p>
                )}
              </li>
            ))}
          </ol>
        )}
      </section>
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Add Exercise</h2>
        <form action={createExerciseAction} className="mt-6 space-y-4">
          <input type="hidden" name="workoutId" value={workout.id} />

          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Exercise Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Add Exercise
          </button>
        </form>
      </section>
    </div>
  );
}
