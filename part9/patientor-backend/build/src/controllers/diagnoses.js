"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const diagnosesService_1 = __importDefault(require("../services/diagnosesService"));
const diagnosesRouter = (0, express_1.Router)();
diagnosesRouter.get("/", (_req, res) => {
    const diagnoses = diagnosesService_1.default.getDiagnoses();
    res.json(diagnoses);
});
exports.default = diagnosesRouter;
