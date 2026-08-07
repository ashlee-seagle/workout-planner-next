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
export type ExerciseInput = {
  name: string;
  sets?: number | null;
  reps?: string | null;
  weight?: number | null;
  restSeconds?: number | null;
  notes?: string | null;
};

 
/**
 * Creates a workout owned by the specified user.
 */
export async function createWorkout(input: CreateWorkoutInput) {
    return prisma.workout.create({
        data: input,
    });
} 

export async function createExercise(workoutId:string, input: ExerciseInput) {
    const exerciseCount = await prisma.exercise.count({
    where: {
      workoutId,
    },
    });

  return prisma.exercise.create({
    data: {
      ...input,
      workoutId,
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

export async function getExercise(
  exerciseId: string,
  workoutId: string,
) {
  return prisma.exercise.findFirst({
    where: {
      id: exerciseId,
      workoutId,
    },
  });
}

export async function updateExercise(
  exerciseId: string,
  workoutId: string,
  input: ExerciseInput,
) {
    return prisma.exercise.updateMany({
    where: {
      id: exerciseId,
      workoutId,
    },
    data: input,
  });
}

export async function deleteExercise(
  exerciseId: string,
  workoutId: string,
) {
  return prisma.exercise.deleteMany({
    where: {
      id: exerciseId,
      workoutId,
    },
  });
}