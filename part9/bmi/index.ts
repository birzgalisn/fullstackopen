import express from "express";
import { parseCalculateBmi } from "./bmiCalculator";
import { parseCalculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  const bmi = parseCalculateBmi(height, weight);

  if (typeof bmi === "object" && Object.keys(bmi).includes("error")) {
    return res.status(400).json(bmi);
  }

  return res.json({ height: height, weight: height, bmi });
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;

  const exercisesOverview = parseCalculateExercises(daily_exercises, target);

  if (Object.keys(exercisesOverview).includes("error")) {
    return res.status(400).json(exercisesOverview);
  }

  return res.json(exercisesOverview);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
