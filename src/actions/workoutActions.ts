"use server";
import { redirect } from "next/navigation";
import { createExercise, createWorkout } from "@/repositories/workoutRepository";

export async function createWorkoutAction(formData: FormData) {
  const title = formData.get("title");
  const goal = formData.get("goal");
  const DEV_USER_ID = "cmsagifuk0000upu5lajy8s7a";

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
    const name = formData.get("name");
    const workoutId = formData.get("workoutId");

    if (typeof name !== "string" || !name.trim()) {
        throw new Error("Name is required.");
    }
    if (typeof workoutId !== "string" || !workoutId.trim()) {
        throw new Error("Workout ID is required.");
    }

    await createExercise({
        name: name.trim(),
        workoutId: workoutId,
    });
    redirect(`/workouts/${workoutId}`);
    
}