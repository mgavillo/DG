interface Props{
    cssSize: string,
    strokeWidth: number,
    color: string,
    percentage: number
}


export function PercentageCircle({cssSize, strokeWidth, color, percentage}: Props) {
  return (
    <svg
      viewBox="0 0 36 36"
      style={{ strokeLinecap: "round", width: cssSize, height: cssSize}}
      className="absolute top-auto bottom-auto z-40"
    >
      <linearGradient id="Gradient1">
        <stop className="stop1" offset="0%" stopColor="#FFC32B" />
        <stop className="stop3" offset="100%" stopColor="#FF9B01" />
      </linearGradient>
      <linearGradient id="Gradient2">
        <stop className="stop1" offset="0%" stopColor="#B3A1E3" />
        <stop className="stop3" offset="100%" stopColor="#8557FF" />
      </linearGradient>
      <path
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke={`url(#${color})`}
        stroke-width={strokeWidth}
        stroke-dasharray={`${percentage}, 100`}
      />
    </svg>
  );
}
