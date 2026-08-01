"use server";
import { createWorkout } from "@/repositories/workoutRepository";

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