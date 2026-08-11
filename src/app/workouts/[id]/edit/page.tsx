import Link from "next/link";
import { notFound } from "next/navigation";
import { getWorkout } from "@/repositories/workoutRepository";
import { updateWorkoutAction } from "@/actions/workoutActions";

const DEV_USER_ID = "cmsagifuk0000upu5lajy8s7a";

export default async function EditWorkoutPage({
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
    <div className="mx-auto max-w-2xl">
      <Link
        href={`/workouts/${workout.id}`}
        className="text-sm font-medium text-gray-600 hover:text-black"
      >
        ← Back to workout
      </Link>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight">
        Edit Workout
      </h1>

      <form action={updateWorkoutAction} className="mt-8 space-y-4">
        <input type="hidden" name="workoutId" value={workout.id} />

        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={workout.title}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="goal" className="mb-1 block text-sm font-medium">
            Goal
          </label>
          <textarea
            id="goal"
            name="goal"
            defaultValue={workout.goal ?? ""}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label
            htmlFor="durationMinutes"
            className="mb-1 block text-sm font-medium"
          >
            Duration (minutes)
          </label>
          <input
            id="durationMinutes"
            name="durationMinutes"
            type="number"
            min={1}
            defaultValue={workout.durationMinutes ?? ""}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label
            htmlFor="experienceLevel"
            className="mb-1 block text-sm font-medium"
          >
            Experience Level
          </label>
          <select
            id="experienceLevel"
            name="experienceLevel"
            defaultValue={workout.experienceLevel ?? ""}
            className="w-full rounded-md border px-3 py-2"
          >
            <option value="">Select a level</option>
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>
        </div>

        <div>
          <label htmlFor="equipment" className="mb-1 block text-sm font-medium">
            Equipment
          </label>
          <input
            id="equipment"
            name="equipment"
            type="text"
            defaultValue={workout.equipment ?? ""}
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
            defaultValue={workout.notes ?? ""}
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
