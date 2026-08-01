import { createWorkoutAction } from "@/actions/workoutActions";

export default function CreateWorkoutPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-semibold tracking-tight">
        Create a Workout
      </h1>
      <form action={createWorkoutAction} className="mt-8 space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
        <label htmlFor="goal" className="block text-sm font-medium">
          Goal
        </label>
        <textarea
          id="goal"
          name="goal"
          rows={4}
          className="w-full rounded-md border px-3 py-2"
        />
        <button
          type="submit"
          className="rounded-md bg-black px-4 py-2 font-medium text-white"
        >
          Create Workout
        </button>
      </form>
    </div>
  );
}
