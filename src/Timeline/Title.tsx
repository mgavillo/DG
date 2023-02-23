import { nbMsDay } from "../utils";

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
  heavyText = date.getFullYear();

  let firstDayofWeek = date.getDate() - date.getDay() + 1;
  const firstDate = new Date(date);
  const secDate = new Date(date);
  switch (timeSelected) {
    case 0:
      firstDate.setDate(date.getDate() - date.getDay() + 1);
      secDate.setDate(date.getDate() + 7 - date.getDay());
      text = `${firstDate.getDate()} - ${secDate.getDate()} ${date.toLocaleString(
        "default",
        {
          month: "long",
        }
      )}`;
      break;
    case 1:
      text = `${date.toLocaleString("default", {
        month: "long",
      })}`;
      break;
    case 2:
      text = `${date.toLocaleString("default", {
        month: "long",
      })} - ${new Date(secDate.setMonth(date.getMonth() + 1)).toLocaleString(
        "default",
        {
          month: "long",
        }
      )}`;

      break;
    case 4:
      heavyText = `${date.getFullYear()} - ${date.getFullYear() + 4}`;
  }
  return (
    <div className="flex flex-col items-center">
      <h1 className="m-7 text-2xl">
        {text} <span className="font-black">{heavyText}</span>
      </h1>
      {/* <p>{underText}</p> */}
    </div>
  );
}
