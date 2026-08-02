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

export type CreateExerciseInput = {
    name: string;
    sets?: number;
    reps?: string;
    weight?: number;
    restSeconds?: number;
    notes?: string;
    workoutId: string;
};

 
/**
 * Creates a workout owned by the specified user.
 */
export async function createWorkout(input: CreateWorkoutInput) {
    return prisma.workout.create({
        data: input,
    });
} 

export async function createExercise(input: CreateExerciseInput) {
    const exerciseCount = await prisma.exercise.count({
    where: {
      workoutId: input.workoutId,
    },
    });

  return prisma.exercise.create({
    data: {
      ...input,
      order: exerciseCount + 1,
    },
    });
}

export async function getWorkouts(userId: string) {
    return prisma.workout.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            _count: { 
                select: {
                    exercises: true,
                },
            },
        },
    });
}

export async function getWorkout(id: string, userId: string) {
    return prisma.workout.findFirst({
        where: {
            id,
            userId,
        },
        include: {
            exercises: {
                orderBy: {
                    order: "asc",
                },
            }
        }
    })
}