import Link from "next/link";
import { notFound } from "next/navigation";
import { getExercise } from "@/repositories/workoutRepository";
import { updateExerciseAction } from "@/actions/workoutActions";

export default async function EditExercisePage({
  params,
}: {
  params: Promise<{
    id: string;
    exerciseId: string;
  }>;
}) {
  const { id: workoutId, exerciseId } = await params;
  const exercise = await getExercise(exerciseId, workoutId);

  if (!exercise) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href={`/workouts/${workoutId}`}
        className="text-sm font-medium text-gray-600 hover:text-black"
      >
        ← Back to workout
      </Link>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight">
        Edit Exercise
      </h1>

      <form action={updateExerciseAction} className="mt-8 space-y-4">
        <input type="hidden" name="exerciseId" value={exercise.id} />
        <input type="hidden" name="workoutId" value={workoutId} />

        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Exercise Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={exercise.name}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="sets" className="mb-1 block text-sm font-medium">
            Sets
          </label>
          <input
            id="sets"
            name="sets"
            type="number"
            min={1}
            defaultValue={exercise.sets ?? ""}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="reps" className="mb-1 block text-sm font-medium">
            Reps
          </label>
          <input
            id="reps"
            name="reps"
            type="text"
            defaultValue={exercise.reps ?? ""}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="weight" className="mb-1 block text-sm font-medium">
            Weight (lb)
          </label>
          <input
            id="weight"
            name="weight"
            type="number"
            min={0}
            step="0.5"
            defaultValue={exercise.weight?.toString() ?? ""}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label
            htmlFor="restSeconds"
            className="mb-1 block text-sm font-medium"
          >
            Rest (seconds)
          </label>
          <input
            id="restSeconds"
            name="restSeconds"
            type="number"
            min={0}
            defaultValue={exercise.restSeconds ?? ""}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="notes" className="mb-1 block text-sm font-medium">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            defaultValue={exercise.notes ?? ""}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-black px-4 py-2 font-medium text-white hover:bg-gray-800"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
