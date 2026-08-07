"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createExercise, createWorkout, getWorkout, updateExercise } from "@/repositories/workoutRepository";

const DEV_USER_ID = "cmsagifuk0000upu5lajy8s7a";

export async function createWorkoutAction(formData: FormData) {
  const title = formData.get("title");
  const goal = formData.get("goal");

  if (typeof title !== "string" || !title.trim()) {
    throw new Error("Title is required.");
  }

  await createWorkout({
    title: title.trim(),
    goal:
      typeof goal === "string" && goal.trim()
        ? goal.trim()
        : undefined,

    // Temporary until authentication is implemented
    userId: DEV_USER_ID,
  });
}

export async function createExerciseAction(formData: FormData) {
  const nameValue = formData.get("name");
  const workoutIdValue = formData.get("workoutId");
  const setsValue = formData.get("sets");
  const repsValue = formData.get("reps");
  const weightValue = formData.get("weight");
  const restSecondsValue = formData.get("restSeconds");
  const notesValue = formData.get("notes");

  if (typeof nameValue !== "string" || !nameValue.trim()) {
    throw new Error("Name is required.");
  }

  if (typeof workoutIdValue !== "string" || !workoutIdValue.trim()) {
    throw new Error("Workout ID is required.");
  }

  const workoutId = workoutIdValue.trim();

  const workout = await getWorkout(workoutId, DEV_USER_ID);

  if (!workout) {
    throw new Error("Workout not found.");
  }

  const sets =
    typeof setsValue === "string" && setsValue.trim()
      ? Number(setsValue)
      : undefined;

  const reps =
    typeof repsValue === "string" && repsValue.trim()
      ? repsValue.trim()
      : undefined;

  const weight =
    typeof weightValue === "string" && weightValue.trim()
      ? Number(weightValue)
      : undefined;

  const restSeconds =
    typeof restSecondsValue === "string" && restSecondsValue.trim()
      ? Number(restSecondsValue)
      : undefined;

  const notes =
    typeof notesValue === "string" && notesValue.trim()
      ? notesValue.trim()
      : undefined;

  if (sets !== undefined && (!Number.isInteger(sets) || sets < 1)) {
    throw new Error("Sets must be a whole number of at least 1.");
  }

  if (weight !== undefined && (!Number.isFinite(weight) || weight < 0)) {
    throw new Error("Weight must be a valid non-negative number.");
  }

  if (
    restSeconds !== undefined &&
    (!Number.isInteger(restSeconds) || restSeconds < 0)
  ) {
    throw new Error("Rest must be a non-negative whole number.");
  }

  await createExercise( workoutId, {
    name: nameValue.trim(),
    sets,
    reps,
    weight,
    restSeconds,
    notes,
  });

  revalidatePath("/workouts");
  revalidatePath(`/workouts/${workoutId}`);

  redirect(`/workouts/${workoutId}`);
}

export async function updateExerciseAction(formData: FormData) {
  const exerciseIdValue = formData.get("exerciseId");
  const workoutIdValue = formData.get("workoutId");
  const nameValue = formData.get("name");
  const setsValue = formData.get("sets");
  const repsValue = formData.get("reps");
  const weightValue = formData.get("weight");
  const restSecondsValue = formData.get("restSeconds");
  const notesValue = formData.get("notes");

  if (typeof exerciseIdValue !== "string" || !exerciseIdValue.trim()) {
    throw new Error("Exercise ID is required.");
  }

  if (typeof workoutIdValue !== "string" || !workoutIdValue.trim()) {
    throw new Error("Workout ID is required.");
  }

  if (typeof nameValue !== "string" || !nameValue.trim()) {
    throw new Error("Name is required.");
  }

  const exerciseId = exerciseIdValue.trim();
  const workoutId = workoutIdValue.trim();

  const sets =
  typeof setsValue === "string" && setsValue.trim()
    ? Number(setsValue)
    : null;

const reps =
  typeof repsValue === "string" && repsValue.trim()
    ? repsValue.trim()
    : null;

const weight =
  typeof weightValue === "string" && weightValue.trim()
    ? Number(weightValue)
    : null;

const restSeconds =
  typeof restSecondsValue === "string" && restSecondsValue.trim()
    ? Number(restSecondsValue)
    : null;

const notes =
  typeof notesValue === "string" && notesValue.trim()
    ? notesValue.trim()
    : null;

    if (sets !== null && (!Number.isInteger(sets) || sets < 1)) {
    throw new Error("Sets must be a whole number of at least 1.");
  }

  if (weight !== null && (!Number.isFinite(weight) || weight < 0)) {
    throw new Error("Weight must be a valid non-negative number.");
  }

    if (
    restSeconds !== null &&
    (!Number.isInteger(restSeconds) || restSeconds < 0)
  ) {
    throw new Error("Rest must be a non-negative whole number.");
  } 

  const result = await updateExercise(exerciseId, workoutId, {
    name: nameValue.trim(),
    sets,
    reps,
    weight,
    restSeconds,
    notes,
  });

  if (result.count === 0) {
    throw new Error("Exercise not found.");
  }

  revalidatePath(`/workouts/${workoutId}`);
  redirect(`/workouts/${workoutId}`);
}