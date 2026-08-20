"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import { createExerciseAction } from "@/actions/workoutActions";

type ExerciseModalProps = {
  workoutId: string;
};

export default function ExerciseModal({ workoutId }: ExerciseModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Add Exercise</button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Exercise"
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
      </Modal>
    </>
  );
}
