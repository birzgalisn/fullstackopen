type ICalculateExercisesResult = {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
};

interface ICalculateExercises {
  (
    dailyExerciseHours: number[],
    targetAmount: number
  ): ICalculateExercisesResult;
}

export const calculateExercises: ICalculateExercises = (
  dailyExerciseHours,
  targetAmount
) => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((h) => h !== 0).length;
  const average = dailyExerciseHours.reduce((a, b) => a + b) / periodLength;
  const target = targetAmount;
  const success = average > target;
  const daysSkipped = periodLength - trainingDays;
  const rating = daysSkipped === 0 && success ? 3 : daysSkipped === 1 ? 2 : 1;
  const ratingDescription =
    rating === 3
      ? "better. faster. stronger"
      : rating === 2
      ? "almost there"
      : "keep pushing";

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

interface IParsecalculateExercises {
  (dailyExerciseHours: unknown[], targetAmount: unknown):
    | ICalculateExercisesResult
    | { error: string };
}

export const parseCalculateExercises: IParsecalculateExercises = (
  dailyExerciseHours,
  targetAmount
) => {
  const parsedDailyExerciseHours = dailyExerciseHours.map(Number);
  const parsedTargetAmount = Number(targetAmount);

  if (parsedDailyExerciseHours.some(isNaN) || isNaN(parsedTargetAmount)) {
    return { error: "Malformatted parameters" };
  }

  return calculateExercises(parsedDailyExerciseHours, parsedTargetAmount);
};

if (process.argv.length > 2) {
  const [, , targetAmount, ...dailyExerciseHours] = process.argv;
  console.log(parseCalculateExercises(dailyExerciseHours, targetAmount));
}
