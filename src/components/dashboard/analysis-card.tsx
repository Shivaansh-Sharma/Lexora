type AnalysisCardProps = {
  type: string;
  inputText: string;
  label: string;
  score: number;
  createdAt: Date;
};

export default function AnalysisCard({
  type,
  inputText,
  label,
  score,
  createdAt,
}: AnalysisCardProps) {

  return (

    <div className="rounded-2xl border border-white/10 bg-card/70 p-6 backdrop-blur-xl">

      <div className="flex items-center justify-between">

        <div className="rounded-full bg-violet-600/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-violet-400">

          {type}
        </div>

        <div className="text-sm text-muted-foreground">

          {new Date(
            createdAt
          ).toLocaleString()}
        </div>
      </div>

      <p className="mt-5 line-clamp-3 leading-7 text-muted-foreground">

        {inputText}
      </p>

      <div className="mt-6 flex items-center gap-8">

        <div>

          <p className="text-xs uppercase tracking-wider text-muted-foreground">

            Result
          </p>

          <h3 className="mt-2 text-lg font-bold">

            {label}
          </h3>
        </div>

        <div>

          <p className="text-xs uppercase tracking-wider text-muted-foreground">

            Confidence
          </p>

          <h3 className="mt-2 text-lg font-bold">

            {Math.round(
              score * 100
            )}%
          </h3>
        </div>
      </div>
    </div>
  );
}