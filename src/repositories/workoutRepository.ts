import prisma from "../lib/prisma";
import { ExperienceLevel } from "../generated/prisma/enums";

export type CreateWorkoutInput = {
  title: string;
  goal?: string;
  durationMinutes?: number;
  experienceLevel?: ExperienceLevel;
  equipment?: string;
  notes?: string;
  userId: string;
};

/**
 * Creates a workout owned by the specified user.
 */
export async function createWorkout(input: CreateWorkoutInput) {
    return prisma.workout.create({
        data: input,
    });
} 