import cors from "cors";
import express from "express";
import diagnosesRouter from "./controllers/diagnoses";
import patientsRouter from "./controllers/patients";
import pingRouter from "./controllers/ping";

const app = express();

app.use(cors());
app.use(express.json());
app.set("json spaces", 2);

app.use("/api/ping", pingRouter);
app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

export default app;
