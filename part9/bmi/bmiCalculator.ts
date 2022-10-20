interface ICalculateBmi {
  (height: number, weight: number): string;
}

export const calculateBmi: ICalculateBmi = (height, weight) => {
  const heightSquare = Math.pow(height / 100, 2);
  const bmi = weight / heightSquare;

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal weight";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight";
  }

  return "Obesity";
};

interface IParseCalculateBmi {
  (height: unknown, weight: unknown): string | { error: string };
}

export const parseCalculateBmi: IParseCalculateBmi = (height, weight) => {
  const parsedHeight = Number(height);
  const parsedWeight = Number(weight);

  if (isNaN(parsedHeight) || isNaN(parsedWeight)) {
    return { error: "Malformatted parameters" };
  }

  return calculateBmi(parsedHeight, parsedWeight);
};

if (process.argv.length > 2) {
  const [, , height, mass] = process.argv;
  console.log(parseCalculateBmi(height, mass));
}
