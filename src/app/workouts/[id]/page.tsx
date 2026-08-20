import { auth } from "@/auth";
import Link from "next/link";
import { getWorkout } from "@/repositories/workoutRepository";
import {
  createExerciseAction,
  deleteWorkoutAction,
  deleteExerciseAction,
} from "@/actions/workoutActions";
import { notFound } from "next/navigation";

export default async function WorkoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }
  const workout = await getWorkout(id, session.user.id);

  if (!workout) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <Link
        href="/workouts"
        className="inline-flex text-sm font-medium text-slate-600 transition hover:text-slate-900"
      >
        ← Back to workouts
      </Link>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-sky-600">
              Workout
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {workout.title}
            </h1>

            {workout.goal && (
              <p className="mt-3 max-w-2xl text-slate-600">{workout.goal}</p>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-4 sm:pt-1">
            <form action={deleteWorkoutAction} className="flex">
              <input type="hidden" name="workoutId" value={workout.id} />

              <button
                type="submit"
                className="text-sm font-medium text-red-600 transition hover:text-red-700"
              >
                Delete Workout
              </button>
            </form>

            <Link
              href={`/workouts/${workout.id}/edit`}
              className="text-sm font-medium text-sky-600 transition hover:text-sky-700"
            >
              Edit Workout
            </Link>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-500">
          {workout.durationMinutes != null && (
            <span>{workout.durationMinutes} min</span>
          )}

          {workout.durationMinutes != null && workout.experienceLevel && (
            <span>•</span>
          )}

          {workout.experienceLevel && (
            <span className="capitalize">
              {workout.experienceLevel.toLowerCase()}
            </span>
          )}

          {(workout.durationMinutes != null || workout.experienceLevel) &&
            workout.equipment && <span>•</span>}

          {workout.equipment && <span>{workout.equipment}</span>}
        </div>

        {workout.notes && (
          <div className="mt-6 rounded-xl bg-slate-50 p-5">
            <h2 className="text-sm font-semibold text-slate-500">Notes</h2>
            <p className="mt-2 whitespace-pre-line text-slate-700">
              {workout.notes}
            </p>
          </div>
        )}
      </section>

      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Exercises</h2>
            <p className="mt-1 text-sm text-slate-500">
              Exercises included in this workout.
            </p>
          </div>

          {workout.exercises.length > 0 && (
            <span className="text-sm text-slate-500">
              {workout.exercises.length} exercise
              {workout.exercises.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {workout.exercises.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <h3 className="text-lg font-semibold">No exercises yet</h3>
            <p className="mt-2 text-sm text-slate-500">
              Add your first exercise below to start building this workout.
            </p>
          </div>
        ) : (
          <ol className="mt-6 space-y-4">
            {workout.exercises.map((exercise, index) => (
              <li
                key={exercise.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="flex min-w-0 flex-1 gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 font-semibold text-sky-700">
                      {index + 1}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold">{exercise.name}</h3>

                      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
                        {exercise.sets != null && (
                          <span>{exercise.sets} sets</span>
                        )}

                        {exercise.reps && (
                          <>
                            {exercise.sets != null && <span>•</span>}
                            <span>{exercise.reps} reps</span>
                          </>
                        )}

                        {exercise.weight != null && (
                          <>
                            {(exercise.sets != null || exercise.reps) && (
                              <span>•</span>
                            )}
                            <span>{exercise.weight.toString()} lb</span>
                          </>
                        )}

                        {exercise.restSeconds != null && (
                          <>
                            {(exercise.sets != null ||
                              exercise.reps ||
                              exercise.weight != null) && <span>•</span>}
                            <span>{exercise.restSeconds} sec rest</span>
                          </>
                        )}
                      </div>

                      {exercise.notes && (
                        <p className="mt-3 text-sm text-slate-600">
                          {exercise.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-4 pl-14 sm:pt-1 sm:pl-0">
                    <form action={deleteExerciseAction} className="flex">
                      <input
                        type="hidden"
                        name="exerciseId"
                        value={exercise.id}
                      />
                      <input
                        type="hidden"
                        name="workoutId"
                        value={workout.id}
                      />

                      <button
                        type="submit"
                        className="text-sm font-medium text-red-600 transition hover:text-red-700"
                      >
                        Delete
                      </button>
                    </form>

                    <Link
                      href={`/workouts/${workout.id}/exercises/${exercise.id}/edit`}
                      className="text-sm font-medium text-sky-600 transition hover:text-sky-700"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-sky-600">
            Add to workout
          </p>

          <h2 className="mt-2 text-2xl font-semibold">Add Exercise</h2>

          <p className="mt-1 text-sm text-slate-500">
            Add another movement to this workout.
          </p>
        </div>

        <form action={createExerciseAction} className="mt-6 space-y-5">
          <input type="hidden" name="workoutId" value={workout.id} />

          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Exercise Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="sets"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Number of Sets
              </label>

              <input
                id="sets"
                name="sets"
                type="number"
                min={1}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </div>

            <div>
              <label
                htmlFor="reps"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Number of Reps
              </label>

              <input
                id="reps"
                name="reps"
                type="text"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="weight"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Weight (lb)
              </label>

              <input
                id="weight"
                name="weight"
                type="number"
                step="0.5"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </div>

            <div>
              <label
                htmlFor="restSeconds"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Rest (seconds)
              </label>

              <input
                id="restSeconds"
                name="restSeconds"
                type="number"
                min={0}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="notes"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Notes
            </label>

            <textarea
              id="notes"
              name="notes"
              rows={3}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
          >
            Add Exercise
          </button>
        </form>
      </section>
    </div>
  );
}
