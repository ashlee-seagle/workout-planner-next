import Link from "next/link";

type WorkoutCardProps = {
  id: string;
  title: string;
  goal?: string | null;
  exerciseCount: number;
  durationMinutes?: number | null;
  experienceLevel?: string | null;
};

export default function WorkoutCard({
  id,
  title,
  goal,
  exerciseCount,
  durationMinutes,
  experienceLevel,
}: WorkoutCardProps) {
  return (
    <Link
      href={`/workouts/${id}`}
      className="block rounded-xl border p-4 shadow-sm transition hover:shadow-md"
    >
      <article className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600">
            🏋️
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-semibold">{title}</h2>

            {goal && <p className="mt-1 text-sm text-gray-600">{goal}</p>}

            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
              <span>
                {exerciseCount} exercise
                {exerciseCount !== 1 ? "s" : ""}
              </span>

              {durationMinutes && (
                <>
                  <span>•</span>
                  <span>{durationMinutes} min</span>
                </>
              )}

              {experienceLevel && (
                <>
                  <span>•</span>
                  <span className="capitalize">
                    {experienceLevel.toLowerCase()}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <span className="shrink-0 text-xl text-gray-400">→</span>
      </article>
    </Link>
  );
}
