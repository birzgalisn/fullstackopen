import { Router } from "express";
import diagnosesService from "../services/diagnosesService";

const diagnosesRouter = Router();

diagnosesRouter.get("/", (_req, res) => {
  const diagnoses = diagnosesService.getDiagnoses();
  res.json(diagnoses);
});

export default diagnosesRouter;
