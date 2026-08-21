"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import { createExerciseAction } from "@/actions/workoutActions";

type ExerciseModalProps = {
  mode: "add" | "edit";
  workoutId: string;
  exercise?: {
    id: string;
    name: string;
    sets: number | null;
    reps: string | null;
    weight: number | null;
    restSeconds: number | null;
    notes: string | null;
  };
};

export default function ExerciseModal({
  mode,
  workoutId,
  exercise,
}: ExerciseModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isEdit = mode === "edit";

  return (
    <>
      {isEdit ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="text-sm font-medium text-sky-600 transition hover:text-sky-700"
        >
          Edit
        </button>
      ) : (
        <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-sky-200 bg-sky-50/60 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Keep building your workout
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Add another movement to this routine.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="shrink-0 rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sky-700"
          >
            + Add Exercise
          </button>
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={isEdit ? "Edit Exercise" : "Add Exercise"}
      >
        <form action={createExerciseAction} className="mt-6 space-y-5">
          <input type="hidden" name="workoutId" value={workoutId} />

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
              defaultValue={exercise?.name ?? ""}
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
                defaultValue={exercise?.sets ?? ""}
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
                defaultValue={exercise?.reps ?? ""}
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
                defaultValue={exercise?.weight ?? ""}
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
                defaultValue={exercise?.restSeconds ?? ""}
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
              defaultValue={exercise?.notes ?? ""}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
          >
            {isEdit ? "Edit Exercise" : "Add Exercise"}
          </button>
        </form>
      </Modal>
    </>
  );
}
