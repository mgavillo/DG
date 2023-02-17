interface TitleProps {
  timeSelected: number;
  date: Date;
}

const getWeek = (date: Date) => {
  const year = date.getFullYear();

  const startOfYear = new Date(year, 0, 1);
  const startOfWeek = startOfYear.getDay();
  const elapsedDays =
    (date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24);
  const weekOfYear = Math.ceil((elapsedDays + startOfWeek) / 7);
  return weekOfYear;
};

export function Title({ timeSelected, date }: TitleProps) {
  let text;
  let heavyText;
  let underText;

  switch (timeSelected) {
    case 0:
      text = `${date.toLocaleString("default", {
        month: "long",
      })}`;
      heavyText = `${date.getFullYear()}`;
      underText = `Week ${getWeek(date)}`;
      break;
    case 1:
      text = `${date.toLocaleString("default", {
        month: "long",
      })} ${date.getFullYear()}`;
      break;
    case 2:
      text = `${date.toLocaleString("default", {
        month: "long",
      })} - ${date.toLocaleString("default", {
        month: "long",
      })} ${date.getFullYear()}`;
      break;
    case 3:
      text = `${date.getFullYear()}`;
      break;
    case 4:
      text = `${date.getFullYear()} - ${date.getFullYear() + 4}`;
  }
  return (
    <div className="flex flex-col items-center h-32">
      <h1 className="m-7 text-2xl">
        {text}
        <span className="text-3xl">{heavyText}</span>
      </h1>
      <p>{underText}</p>
    </div>
  );
}
