"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patientsService_1 = __importDefault(require("../services/patientsService"));
const toNewPatient_1 = require("../utils/toNewPatient");
const toNewPatientEntry_1 = require("../utils/toNewPatientEntry");
const patientsRouter = (0, express_1.Router)();
patientsRouter.get("/", (_req, res) => {
    const patients = patientsService_1.default.getNonSensitivePatients();
    res.json(patients);
});
patientsRouter.get("/:id", (req, res) => {
    const patient = patientsService_1.default.findById(req.params.id);
    if (patient) {
        return res.json(patient);
    }
    return res.sendStatus(404);
});
patientsRouter.post("/", (req, res) => {
    try {
        const patient = patientsService_1.default.addPatient((0, toNewPatient_1.toNewPatient)(req.body));
        res.status(201).json(patient);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        }
    }
});
patientsRouter.post("/:id/entries", (req, res) => {
    try {
        const newEntry = patientsService_1.default.addEntry(req.params.id, (0, toNewPatientEntry_1.toNewPatientEntry)(req.body));
        res.status(201).json(newEntry);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        }
    }
});
exports.default = patientsRouter;
