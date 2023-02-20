import { PercentageCircle } from "./PercentageCircle";

export function Impact() {
  const confidance = 95;
  const impact = 87;
  return (
    <div className="rounded-full shadow-lg w-64 h-64 flex flex-col items-center justify-center relative">
      <PercentageCircle
        color="Gradient2"
        cssSize="17rem"
        strokeWidth={1}
        percentage={confidance}
        animationLength={1.5}
      />
      <PercentageCircle
        color="Gradient1"
        cssSize="15rem"
        strokeWidth={2}
        percentage={impact}
        animationLength={2}
      />
      <h2 className="text-2xl"><span className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gaia-light-orange to-gaia-orange">{impact}</span>/100</h2>
      <h2 className="text-2xl font-bold">impact</h2>
      <p>
        <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-gaia-light-purple to-gaia-purple">{confidance}%</span> confidance
      </p>
    </div>
  );
}
