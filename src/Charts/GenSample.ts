import { off } from "process";

interface Entry {
  timestamp: Date;
  mode: number;
  upper_limit: number;
  lower_limit: number;
}

interface Assessment {
  date: string;
  data: Entry[];
}

export const genAssessment = (Bscale: number, scale: number, initial: number) => {
  const B = 1.8511 * Bscale;

  const fn = (x: number, b: number) => { return (b * x - 1.2) ** 3 + (b * x - 1.2) ** 2 + 0.3 };

  const radius = (p: number) => {
    // p should be some percent value in range [0, 1]
    return (-(p * p) + 1) / 2
  }

  const unlerp = (start: number, end: number, amt: number) => {
    return (amt - start) / (end - start)
  }

  const sequence = (count: number) => {
    return Array.from({ length: count }, (_, i) => i);
  }

  const span = (count: number) => {
    return sequence(count).map(
      (x) => { return (x + 1) / count }
    )
  }

  let noise = (magnitude: number) => { return (1 - (Math.random() * 2)) * magnitude }

  const assessment_datetime: string = "2023-09-10 11:31:00Z"
  const data_start_datetime: string = "2020-05-16 12:30:00Z"
  const data_end_datetime: string = "2024-01-01 1:15:00Z"

  let assessment: Assessment = {
    date: assessment_datetime,
    data: []
  }

  const bias = noise(.01)

  // const epoch = (datestring: string) => { return Math.floor(new Date(datestring) / 1000) }
  const epoch = (datestring: string) => {
    const date = new Date(datestring);
    return Number.isNaN(date.getTime()) ? 0 : Math.floor(date.getTime() / 1000);
  };

  const start = epoch(data_start_datetime)
  const end = epoch(data_end_datetime)
  const one_day = 86400

  const timestep = (one_day * 7)

  const samples = (end - start) / timestep

  let time = start
  let sample = 0

  while (time <= end) {
    const datetime = new Date(time * 1000)
    const attenuation = 1 - (sample / samples)
    const value = fn(unlerp(start, end, time) + noise(.1) * attenuation * 3, B + bias)
    const offset = radius(sample / samples) + noise(0.05) * attenuation * 5

    let entry: Entry = {
      timestamp: datetime,
      mode: (value * scale) + initial,
      upper_limit: ((value + offset) * scale) + initial,
      lower_limit: ((value - offset) * scale) + initial
    }

    assessment.data.push(entry)

    time += timestep
    sample += 1
  }
  return assessment
}

export default genAssessment;
// console.log(JSON.stringify(genAssessment(1.5, 1), null, 2)