import { Router } from "express";
import patientsService from "../services/patientsService";
import { toNewPatient } from "../utils/toNewPatient";
import { toNewPatientEntry } from "../utils/toNewPatientEntry";

const patientsRouter = Router();

patientsRouter.get("/", (_req, res) => {
  const patients = patientsService.getNonSensitivePatients();
  res.json(patients);
});

patientsRouter.get("/:id", (req, res) => {
  const patient = patientsService.findById(req.params.id);
  if (patient) {
    return res.json(patient);
  }
  return res.sendStatus(404);
});

patientsRouter.post("/", (req, res) => {
  try {
    const patient = patientsService.addPatient(toNewPatient(req.body));
    res.status(201).json(patient);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
  }
});

patientsRouter.post("/:id/entries", (req, res) => {
  try {
    const newEntry = patientsService.addEntry(
      req.params.id,
      toNewPatientEntry(req.body)
    );
    res.status(201).json(newEntry);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
  }
});

export default patientsRouter;
